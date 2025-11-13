import { NextRequest, NextResponse } from 'next/server';
import { enrichLead, LeadData } from '@/lib/leadEnrichment';
import { calculateAllAttributions } from '@/lib/attribution';
import { recordConversion, getOrCreateJourney } from '@/lib/attributionStorage';
import { getIntentScore } from '@/lib/intentStorage';
import { saveEnquiry } from '@/lib/enquiryStorage';
import { resend } from '@/lib/resend';
import { customerConfirmationEmail } from '@/emails/customer-confirmation';
import { teamNotificationEmail } from '@/emails/team-notification';

/**
 * POST /api/contact/submit
 * Handle contact form submissions with automatic lead enrichment
 *
 * Features:
 * - IP-based company lookup
 * - Email domain enrichment
 * - LinkedIn profile lookup (when API configured)
 * - Auto-tagging by industry, size, location
 * - Lead scoring and pre-qualification
 * - Intent score integration
 * - Multi-touch attribution tracking
 * - Customer confirmation email (Resend)
 * - Team notification email with enriched data (Resend)
 * - Telegram notification with enriched data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get client metadata
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    // Get user ID from cookie for attribution tracking
    const cookieHeader = request.headers.get('cookie') || '';
    const userIdMatch = cookieHeader.match(/_guest_uid=([^;]+)/);
    const userId = userIdMatch ? userIdMatch[1] : `user_${Date.now()}`;

    // Build lead data
    const leadData: LeadData = {
      name,
      email,
      company,
      message,
      ipAddress: ipAddress.split(',')[0].trim(), // Get first IP if multiple
      userAgent,
      referrer,
      submittedAt: Date.now(),
    };

    console.log('[Contact Submit] New lead:', { email, company, ipAddress, userId });

    // Enrich lead data
    const enrichedData = await enrichLead(leadData);
    leadData.enrichedData = enrichedData;

    console.log('[Contact Submit] Lead enriched:', {
      email,
      score: enrichedData.score,
      grade: enrichedData.grade,
      qualified: enrichedData.qualified,
      tags: enrichedData.tags,
    });

    // Record conversion with attribution tracking
    const journey = getOrCreateJourney(userId);
    const conversion = recordConversion(userId, {
      userId,
      type: 'contact-form',
      value: 0, // No immediate revenue, but we can set a potential value later
      leadData: {
        name,
        email,
        company,
        qualified: enrichedData.qualified,
        score: enrichedData.score,
      },
    });

    // Calculate full attribution
    conversion.attribution = calculateAllAttributions(journey);

    console.log('[Contact Submit] Attribution calculated:', {
      touchpoints: journey.touchpointCount,
      daysSinceFirstTouch: journey.daysSinceFirstTouch.toFixed(2),
      firstTouch: conversion.attribution.firstTouch.channel,
      lastTouch: conversion.attribution.lastTouch.channel,
    });

    // Get intent score for the user (if available)
    const intentScore = getIntentScore(userId);
    console.log('[Contact Submit] Intent score:', intentScore?.totalScore || 'N/A');

    // Send email notifications
    await sendEmailNotifications(leadData, conversion, intentScore);

    // Send notification to Telegram with enriched data and attribution (backup)
    await notifyTeamOfNewLead(leadData, conversion);

    // Store enquiry in memory storage (use database in production)
    const enquiry = saveEnquiry({
      name,
      email,
      company,
      message,
      ipAddress: leadData.ipAddress || '',
      userAgent: leadData.userAgent || '',
      referrer: leadData.referrer || '',
      enrichedData: leadData.enrichedData,
      attribution: {
        touchpoints: journey.touchpointCount,
        daysSinceFirstTouch: journey.daysSinceFirstTouch,
        firstTouch: conversion.attribution.firstTouch.channel,
        lastTouch: conversion.attribution.lastTouch.channel,
      },
      intentScore: intentScore?.totalScore,
    });

    console.log('[Contact Submit] Enquiry saved:', { id: enquiry.id, email: enquiry.email });

    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ll be in touch within 24 hours.',
      leadScore: enrichedData.score,
      qualified: enrichedData.qualified,
    });
  } catch (error) {
    console.error('[Contact Submit] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

/**
 * Send email notifications via Resend
 * - Customer confirmation email
 * - Team notification email with enriched data, intent score, and attribution
 */
async function sendEmailNotifications(
  lead: LeadData,
  conversion: any,
  intentScore?: any
) {
  try {
    const enriched = lead.enrichedData!;

    // 1. Send customer confirmation email
    try {
      const customerEmail = customerConfirmationEmail({
        name: lead.name,
        email: lead.email,
        company: lead.company,
        message: lead.message,
      });

      const customerResult = await resend.emails.send({
        from: 'BUILDMYDIGITAL <onboarding@resend.dev>', // Update with your verified domain
        to: [lead.email],
        subject: 'Thanks for reaching out!',
        html: customerEmail,
      });

      console.log('[Contact Submit] Customer confirmation email sent to:', lead.email);
      console.log('[Contact Submit] Customer email Resend response:', customerResult);
    } catch (error) {
      console.error('[Contact Submit] Error sending customer email:', error);
      // Don't throw - continue with team notification
    }

    // 2. Send team notification email with enriched data
    // DISABLED: Using Telegram instead to save email quota
    /*
    try {
      // Determine intent category
      let intentCategory = 'browsing';
      if (intentScore?.totalScore >= 70) intentCategory = 'hot';
      else if (intentScore?.totalScore >= 50) intentCategory = 'warm';
      else if (intentScore?.totalScore >= 30) intentCategory = 'cold';

      // Build enrichment data for email
      const enrichmentData = enriched.companyData
        ? {
            companyName: enriched.companyData.name,
            industry: enriched.companyData.industry,
            companySize: enriched.companyData.size
              ? `${enriched.companyData.size} employees`
              : undefined,
            location: enriched.companyData.location
              ? [
                  enriched.companyData.location.city,
                  enriched.companyData.location.region,
                  enriched.companyData.location.country,
                ]
                  .filter(Boolean)
                  .join(', ')
              : undefined,
          }
        : undefined;

      // Build attribution data for email
      const attributionData =
        conversion && conversion.journey
          ? {
              firstTouch: conversion.attribution.firstTouch
                ? `${formatChannel(conversion.attribution.firstTouch.channel)} (${
                    conversion.attribution.firstTouch.touchpoint.source
                  })`
                : 'Direct',
              lastTouch: conversion.attribution.lastTouch
                ? `${formatChannel(conversion.attribution.lastTouch.channel)} (${
                    conversion.attribution.lastTouch.touchpoint.source
                  })`
                : 'Direct',
              touchpointCount: conversion.journey.touchpointCount,
              daysSinceFirstTouch: conversion.journey.daysSinceFirstTouch,
            }
          : undefined;

      const teamEmail = teamNotificationEmail({
        name: lead.name,
        email: lead.email,
        company: lead.company,
        message: lead.message,
        leadScore: enriched.score,
        leadGrade: enriched.grade,
        qualified: enriched.qualified,
        enrichmentData,
        intentScore: intentScore?.totalScore,
        intentCategory,
        attributionData,
      });

      const teamRecipient = process.env.TEAM_EMAIL || 'team@buildmydigital.com'; // Update with your team email

      const result = await resend.emails.send({
        from: 'BUILDMYDIGITAL Leads <onboarding@resend.dev>', // Update with your verified domain
        to: [teamRecipient],
        subject: `🎯 New ${enriched.qualified ? 'Qualified' : ''} Lead: ${lead.name} (Score: ${enriched.score}/100)`,
        html: teamEmail,
      });

      console.log('[Contact Submit] Team notification email sent to:', teamRecipient);
      console.log('[Contact Submit] Resend response:', result);
    } catch (error) {
      console.error('[Contact Submit] Error sending team email:', error);
      // Don't throw - this is non-critical
    }
    */
    console.log('[Contact Submit] Team email notification disabled - using Telegram instead');
  } catch (error) {
    console.error('[Contact Submit] Error in email notifications:', error);
    // Don't throw - email failures shouldn't break form submission
  }
}

/**
 * Send Telegram notification with enriched lead data and attribution
 */
async function notifyTeamOfNewLead(lead: LeadData, conversion?: any) {
  // DISABLED: Telegram notifications temporarily disabled
  console.log('[Contact Submit] Telegram notifications disabled');
  return;

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('[Contact Submit] Telegram not configured, skipping notification');
    return;
  }

  try {
    const enriched = lead.enrichedData!;

    // Build message with enriched data
    let message = `🎯 *NEW LEAD SUBMISSION*\n\n`;

    // Lead grade badge
    const gradeBadge = {
      A: '🔥 HOT LEAD',
      B: '⚡ WARM LEAD',
      C: '❄️ COLD LEAD',
      D: '⛔ UNQUALIFIED',
    }[enriched.grade];

    message += `${gradeBadge} (Score: ${enriched.score}/100)\n`;
    message += `Qualified: ${enriched.qualified ? '✅ YES' : '❌ NO'}\n\n`;

    // Contact details
    message += `*CONTACT INFO*\n`;
    message += `👤 Name: ${lead.name}\n`;
    message += `📧 Email: ${lead.email}\n`;
    if (lead.company) {
      message += `🏢 Company (provided): ${lead.company}\n`;
    }
    message += `\n`;

    // Enriched company data
    if (enriched.companyData?.name) {
      message += `*COMPANY DATA* (enriched)\n`;
      message += `🏢 Name: ${enriched.companyData.name}\n`;
      if (enriched.companyData.domain) {
        message += `🌐 Domain: ${enriched.companyData.domain}\n`;
      }
      if (enriched.companyData.industry) {
        message += `🏭 Industry: ${enriched.companyData.industry}\n`;
      }
      if (enriched.companyData.size) {
        message += `👥 Size: ${enriched.companyData.size} employees\n`;
      }
      if (enriched.companyData.location) {
        const loc = enriched.companyData.location;
        message += `📍 Location: ${[loc.city, loc.region, loc.country].filter(Boolean).join(', ')}\n`;
      }
      message += `\n`;
    }

    // Contact data
    if (enriched.contactData?.linkedInUrl) {
      message += `*CONTACT DATA*\n`;
      message += `🔗 LinkedIn: ${enriched.contactData.linkedInUrl}\n`;
      if (enriched.contactData.jobTitle) {
        message += `💼 Title: ${enriched.contactData.jobTitle}\n`;
      }
      if (enriched.contactData.seniority) {
        message += `⭐ Seniority: ${enriched.contactData.seniority}\n`;
      }
      message += `\n`;
    }

    // Message
    message += `*MESSAGE*\n`;
    message += `${lead.message}\n\n`;

    // Tags
    if (enriched.tags.length > 0) {
      message += `*TAGS*\n`;
      message += enriched.tags.map(tag => `#${tag.replace(/[^a-zA-Z0-9_]/g, '_')}`).join(' ');
      message += `\n\n`;
    }

    // Qualification reasons
    if (enriched.qualificationReasons.length > 0) {
      message += `*QUALIFICATION*\n`;
      enriched.qualificationReasons.forEach(reason => {
        message += `• ${reason}\n`;
      });
      message += `\n`;
    }

    // Attribution Journey (if available)
    if (conversion && conversion.journey) {
      message += `*CONVERSION JOURNEY*\n`;
      message += `🎯 Touchpoints: ${conversion.journey.touchpointCount}\n`;

      if (conversion.journey.daysSinceFirstTouch > 0) {
        message += `⏱️ Time to Convert: ${conversion.journey.daysSinceFirstTouch.toFixed(1)} days\n`;
      }

      if (conversion.attribution.firstTouch) {
        const firstTouch = conversion.attribution.firstTouch;
        message += `🥇 First Touch: ${formatChannel(firstTouch.channel)} (${firstTouch.touchpoint.source})\n`;
      }

      if (conversion.attribution.lastTouch) {
        const lastTouch = conversion.attribution.lastTouch;
        message += `🏁 Last Touch: ${formatChannel(lastTouch.channel)} (${lastTouch.touchpoint.source})\n`;
      }

      // Show conversion path (last 5 touchpoints)
      if (conversion.journey.touchpoints.length > 0) {
        message += `\n*CONVERSION PATH*\n`;
        const pathTouchpoints = conversion.journey.touchpoints.slice(-5);
        pathTouchpoints.forEach((tp: any, i: number) => {
          const emoji = i === pathTouchpoints.length - 1 ? '🏁' : '→';
          message += `${emoji} ${formatChannel(tp.channel)}: ${tp.path}\n`;
        });
      }

      message += `\n`;
    }

    // Metadata
    message += `*METADATA*\n`;
    message += `🌐 IP: ${lead.ipAddress}\n`;
    if (lead.referrer) {
      message += `🔗 Referrer: ${lead.referrer}\n`;
    }
    message += `📅 Time: ${new Date(lead.submittedAt).toLocaleString('en-GB')}\n`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    console.log('[Contact Submit] Telegram notification sent');
  } catch (error) {
    console.error('[Contact Submit] Error sending Telegram notification:', error);
  }
}

/**
 * Format marketing channel for display
 */
function formatChannel(channel: string): string {
  const channelNames: Record<string, string> = {
    'organic-search': '🔍 Organic Search',
    'paid-search': '💰 Paid Search',
    'paid-social': '📱 Paid Social',
    'organic-social': '👥 Social Media',
    'email': '📧 Email',
    'direct': '🔗 Direct',
    'referral': '🌐 Referral',
    'display': '🖼️ Display Ads',
    'affiliate': '🤝 Affiliate',
    'other': '❓ Other',
  };

  return channelNames[channel] || channel;
}
