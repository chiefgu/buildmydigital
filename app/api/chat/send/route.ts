import { NextRequest, NextResponse } from 'next/server';
import { db, Message } from '@/lib/db';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Pusher from 'pusher';

// Initialize Gemini (you'll need to add GEMINI_API_KEY to .env.local)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Initialize Pusher (you'll need to add these to .env.local)
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.PUSHER_CLUSTER || 'eu',
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const { text, sessionId, userEmail, userName, sessionAnalytics } = await request.json();

    console.log('[Chat API] Received sessionAnalytics:', sessionAnalytics);

    if (!text || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get or create session
    let session = db.getSession(sessionId);
    if (!session) {
      session = db.createSession({
        id: sessionId,
        createdAt: new Date(),
        lastMessageAt: new Date(),
        isActive: true,
        source: 'web', // Mark as web chat
        userEmail,
        userName,
      });
      console.log('[Chat API] Created new session with analytics:', !!sessionAnalytics);
    }

    // Add user message
    const userMessage: Message = {
      id: `${Date.now()}-user`,
      sessionId,
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    db.addMessage(userMessage);

    // Send notification to Telegram group
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_TEAM_CHAT_ID) {
      await notifyTeamViaTelegram(session, userMessage);
    }

    // Broadcast user message via Pusher
    if (process.env.PUSHER_KEY) {
      await pusher.trigger(`chat-${sessionId}`, 'new-message', userMessage);
      // Also broadcast to team dashboard
      await pusher.trigger('team-dashboard', 'new-user-message', {
        ...userMessage,
        sessionId,
        userName: session.userName || 'Anonymous',
      });
    }

    // Check if team is online
    const isTeamOnline = db.isAnyTeamOnline();

    // Team will always respond manually (AI auto-response disabled)
    if (false && !isTeamOnline && process.env.GEMINI_API_KEY) {
      try {
        // Get conversation history for context
        const messages = db.getMessages(sessionId);
        const conversationHistory = messages
          .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
          .join('\n');

        const systemPrompt = `You are a helpful assistant for BUILDMYDIGITAL, a digital agency that provides:
1. High-Converting Websites - Pages optimized for conversions
2. Marketing Automation - 24/7 lead capture and nurturing
3. Real-Time Analytics - Track leads, calls, and conversions
4. Commission-Only Closers - Sales team that only gets paid on results

We offer 3 pricing levels:
- Level 1: Closers Only (£0 setup + 10-20% commission)
- Level 2: Infrastructure + Closers (£1,500/mo + 10-15% commission)
- Level 3: Full Revenue Engine (£2,500/mo + 10% commission)

Be helpful, professional, and concise. If someone asks about pricing or services, provide specific details. Always encourage them to book a free revenue audit.

Previous conversation:
${conversationHistory}

User: ${text}
Assistant:`;

        // Call Gemini
        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const aiResponse = response.text() || 'Sorry, I couldn\'t process that. Please try again.';

        // Add AI message
        const aiMessage: Message = {
          id: `${Date.now()}-ai`,
          sessionId,
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
          agentName: 'AI Assistant',
        };

        db.addMessage(aiMessage);

        // Broadcast AI message via Pusher
        if (process.env.PUSHER_KEY) {
          await pusher.trigger(`chat-${sessionId}`, 'new-message', aiMessage);
        }

        return NextResponse.json({
          success: true,
          userMessage,
          aiMessage,
          isTeamOnline: false,
        });
      } catch (aiError) {
        console.error('OpenAI error:', aiError);
        // Fallback message if AI fails
        const fallbackMessage: Message = {
          id: `${Date.now()}-fallback`,
          sessionId,
          text: 'Thanks for your message! Our team will get back to you shortly. In the meantime, you can book a free revenue audit at buildmydigital.com/contact',
          sender: 'ai',
          timestamp: new Date(),
          agentName: 'Auto-responder',
        };

        db.addMessage(fallbackMessage);

        if (process.env.PUSHER_KEY) {
          await pusher.trigger(`chat-${sessionId}`, 'new-message', fallbackMessage);
        }

        return NextResponse.json({
          success: true,
          userMessage,
          aiMessage: fallbackMessage,
          isTeamOnline: false,
        });
      }
    }

    // If team is online, just return success (team will respond manually)
    return NextResponse.json({
      success: true,
      userMessage,
      isTeamOnline: true,
      message: 'Message sent to team',
    });

  } catch (error) {
    console.error('Chat send error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to generate AI summary of user session analytics
async function generateAnalyticsSummary(analytics: any): Promise<string> {
  if (!analytics) {
    console.log('[AI Summary] No analytics provided');
    return '';
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error('[AI Summary] GEMINI_API_KEY not found in environment');
    return '';
  }

  try {
    console.log('[AI Summary] Building prompt with analytics data:', {
      sessionDuration: analytics.sessionDuration,
      totalPages: analytics.totalPages,
      ctaClicks: analytics.ctaClicks?.length || 0,
      pricingViews: analytics.pricingViews?.length || 0,
      maxScrollDepth: analytics.maxScrollDepth,
      sectionsViewed: analytics.sectionsViewed?.length || 0,
      deepestSection: analytics.deepestSectionName || 'None'
    });

    const prompt = `Analyze this website visitor's behavior and create a concise, actionable summary for a sales team:

Session Duration: ${Math.floor(analytics.sessionDuration / 60)} minutes ${analytics.sessionDuration % 60} seconds
Referrer: ${analytics.referrer}
Total Pages Viewed: ${analytics.totalPages}

Page Sections Viewed (7 total sections on homepage):
${analytics.sectionsViewed?.map((s: any) => `- ${s.name} (Section ${s.order}/7)`).join('\n') || 'None'}
Deepest Section Reached: ${analytics.deepestSectionName} (${analytics.deepestSection}/7)

Pages Visited (in order):
${analytics.pagesVisited?.map((p: any) => `- ${p.title} (${p.url}) - ${p.timeSpent}s`).join('\n') || 'None'}

CTA Buttons Clicked:
${analytics.ctaClicks?.map((c: any) => `- "${c.name}" on ${c.location}`).join('\n') || 'None'}

Pricing/Service Interests:
${analytics.pricingViews?.map((p: any) => `- ${p.tier} (${p.action})`).join('\n') || 'None'}

Navigation Patterns:
${analytics.navigationClicks?.map((n: any) => `- Clicked "${n.text}" → ${n.destination}`).join('\n') || 'None'}

Max Scroll Depth: ${analytics.maxScrollDepth}%

IMPORTANT: The 7 homepage sections are:
1. Hero - Sales machine intro
2. Who We Work With - Industries served
3. Revenue Infrastructure - The 4 pillars
4. Pricing - Service tiers
5. Testimonials - Real client results
6. Contact - Contact form
7. Footer - Final CTA

Create a 3-4 sentence summary that:
1. Identifies their intent level (high/medium/low) based on which sections they viewed
2. Highlights which services they're most interested in
3. Suggests best talking points for sales team based on deepest section reached
4. Notes any red flags or special considerations

Be concise and actionable. Focus on what matters for the sales conversation. Pay special attention to whether they reached Pricing (Section 4) or Contact (Section 6) as these indicate high purchase intent.`;

    console.log('[AI Summary] Sending prompt to Gemini (length:', prompt.length, 'chars)');

    const result = await model.generateContent(prompt);
    console.log('[AI Summary] Received result from Gemini');

    const response = await result.response;
    console.log('[AI Summary] Extracted response object');

    const summary = response.text();
    console.log('[AI Summary] Summary text length:', summary?.length || 0, 'chars');
    console.log('[AI Summary] Summary preview:', summary?.substring(0, 200));

    return summary || '';
  } catch (error) {
    console.error('[AI Summary] Error generating summary:', error);
    if (error instanceof Error) {
      console.error('[AI Summary] Error message:', error.message);
      console.error('[AI Summary] Error stack:', error.stack);
    }
    return '';
  }
}

// Helper function to notify team via Telegram Topics
async function notifyTeamViaTelegram(session: any, userMessage: Message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_TEAM_CHAT_ID;

  if (!token || !chatId) return;

  try {
    const userName = session.userName || 'Anonymous User';
    const isFirstMessage = !session.telegramTopicId;

    if (isFirstMessage) {
      // Create a new topic for this user
      const topicName = `${userName} - ${session.id.substring(0, 8)}`;

      console.log('[Telegram] 🆕 Creating new topic for session:', session.id);
      console.log('[Telegram] Topic name:', topicName);

      const createTopicResponse = await fetch(
        `https://api.telegram.org/bot${token}/createForumTopic`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            name: topicName,
            icon_color: 0x6FB9F0, // Light blue color
          }),
        }
      );

      const topicData = await createTopicResponse.json();

      if (!topicData.ok) {
        console.error('[Telegram] ❌ Failed to create topic:', topicData);
        return;
      }

      const topicId = topicData.result.message_thread_id;
      console.log('[Telegram] ✅ Topic created successfully with ID:', topicId);

      // Store the topic ID in the session
      console.log('[Telegram] 💾 Updating session with topic ID...');
      db.updateSession(session.id, {
        telegramTopicId: topicId,
      });

      // Verify the update worked
      const updatedSession = db.getSession(session.id);
      console.log('[Telegram] 🔍 Session after update:', {
        id: updatedSession?.id,
        telegramTopicId: updatedSession?.telegramTopicId,
        userName: updatedSession?.userName,
      });

      // Test if we can retrieve by topic ID
      const foundByTopic = db.getSessionByTelegramTopic(topicId);
      if (foundByTopic) {
        console.log('[Telegram] ✅ Session successfully retrievable by topic ID');
      } else {
        console.log('[Telegram] ❌ WARNING: Session NOT retrievable by topic ID immediately after storage!');
      }

      // Generate AI summary of session analytics
      let analyticsSummary = '';
      console.log('[Telegram] Checking for session analytics...', {
        hasAnalytics: !!session.sessionAnalytics,
        analytics: session.sessionAnalytics
      });

      if (session.sessionAnalytics) {
        console.log('[Telegram] 🤖 Generating AI summary of user session...');
        analyticsSummary = await generateAnalyticsSummary(session.sessionAnalytics);
        console.log('[Telegram] ✅ AI summary generated:', analyticsSummary.substring(0, 100));
      } else {
        console.log('[Telegram] ⚠️ No session analytics available - skipping AI summary');
      }

      // Build analytics section for Telegram message
      let analyticsSection = '';
      if (session.sessionAnalytics) {
        const a = session.sessionAnalytics;
        const duration = Math.floor(a.sessionDuration / 60);
        const seconds = a.sessionDuration % 60;

        analyticsSection =
          `\n━━━━━━━━━━━━━━━━━━━━\n\n` +
          `📊 <b>Session Analytics:</b>\n` +
          `⏱ <b>Time on site:</b> ${duration}m ${seconds}s\n` +
          `📄 <b>Pages viewed:</b> ${a.totalPages}\n` +
          `🔗 <b>Referrer:</b> ${a.referrer || 'Direct'}\n` +
          `📈 <b>Scroll depth:</b> ${a.maxScrollDepth}%\n`;

        if (a.ctaClicks && a.ctaClicks.length > 0) {
          analyticsSection += `\n🎯 <b>CTA Clicks:</b>\n${a.ctaClicks.map((c: any) => `  • ${c.name}`).join('\n')}\n`;
        }

        if (a.pricingViews && a.pricingViews.length > 0) {
          analyticsSection += `\n💰 <b>Pricing Interest:</b>\n${a.pricingViews.map((p: any) => `  • ${p.tier}`).join('\n')}\n`;
        }

        if (analyticsSummary) {
          analyticsSection += `\n🤖 <b>AI Insight:</b>\n${analyticsSummary}\n`;
        }
      }

      // Send welcome message to the new topic
      const userEmail = session.userEmail ? `\n📧 <b>Email:</b> ${session.userEmail}` : '';
      const welcomeMessage =
        `🌐 <b>New Conversation Started</b>\n\n` +
        `👤 <b>From:</b> ${userName}${userEmail}\n` +
        `🆔 <b>Session:</b> <code>${session.id}</code>\n` +
        `🕐 <b>Started:</b> ${new Date().toLocaleString()}` +
        analyticsSection +
        `\n━━━━━━━━━━━━━━━━━━━━\n\n` +
        `💬 <b>First Message:</b>\n${userMessage.text}`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_thread_id: topicId,
          text: welcomeMessage,
          parse_mode: 'HTML',
        }),
      });

    } else {
      // Send message to existing topic
      const followUpMessage = `💬 ${userName}:\n\n${userMessage.text}`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_thread_id: session.telegramTopicId,
          text: followUpMessage,
          parse_mode: 'HTML',
        }),
      });
    }

  } catch (error) {
    console.error('Error notifying team via Telegram:', error);
  }
}
