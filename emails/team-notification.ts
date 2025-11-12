interface TeamNotificationProps {
  name: string;
  email: string;
  company?: string;
  message: string;
  phone?: string;
  leadScore: number;
  leadGrade: string;
  qualified: boolean;
  enrichmentData?: {
    companyName?: string;
    industry?: string;
    companySize?: string;
    location?: string;
  };
  intentScore?: number;
  intentCategory?: string;
  attributionData?: {
    firstTouch: string;
    lastTouch: string;
    touchpointCount: number;
    daysSinceFirstTouch: number;
  };
}

export function teamNotificationEmail({
  name,
  email,
  company,
  message,
  phone,
  leadScore,
  leadGrade,
  qualified,
  enrichmentData,
  intentScore,
  intentCategory,
  attributionData,
}: TeamNotificationProps) {
  const scoreColor = leadScore >= 70 ? '#dc2626' : leadScore >= 50 ? '#f59e0b' : '#10b981';
  const qualifiedBadge = qualified
    ? '<span style="background-color: #10b981; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600;">✓ QUALIFIED</span>'
    : '<span style="background-color: #6b7280; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600;">NOT QUALIFIED</span>';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead: ${name}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                      🔔 New Lead Submitted
                    </h1>
                    <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                      ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Score Section -->
          <tr>
            <td style="padding: 30px 40px; border-bottom: 2px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%">
                    <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Lead Score</p>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="font-size: 48px; font-weight: 800; color: ${scoreColor}; line-height: 1;">
                        ${leadScore}
                      </div>
                      <div>
                        <div style="font-size: 24px; font-weight: 700; color: ${scoreColor}; line-height: 1; margin-bottom: 4px;">
                          Grade ${leadGrade}
                        </div>
                        ${qualifiedBadge}
                      </div>
                    </div>
                  </td>
                  ${intentScore !== undefined ? `
                  <td width="50%" style="border-left: 1px solid #e5e7eb; padding-left: 30px;">
                    <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Intent Score</p>
                    <div style="font-size: 36px; font-weight: 800; color: #6366f1; line-height: 1; margin-bottom: 4px;">
                      ${intentScore}/100
                    </div>
                    <p style="margin: 0; color: #374151; font-size: 14px; font-weight: 600; text-transform: capitalize;">
                      ${intentCategory || 'Unknown'}
                    </p>
                  </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding: 30px 40px; border-bottom: 1px solid #e5e7eb;">
              <p style="margin: 0 0 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Contact Information
              </p>

              <table width="100%" cellpadding="8" cellspacing="0">
                <tr>
                  <td width="30%" style="color: #6b7280; font-size: 14px; font-weight: 500;">Name</td>
                  <td style="color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Email</td>
                  <td>
                    <a href="mailto:${email}" style="color: #6366f1; font-size: 14px; font-weight: 600; text-decoration: none;">
                      ${email}
                    </a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Phone</td>
                  <td>
                    <a href="tel:${phone}" style="color: #6366f1; font-size: 14px; font-weight: 600; text-decoration: none;">
                      ${phone}
                    </a>
                  </td>
                </tr>
                ` : ''}
                ${company ? `
                <tr>
                  <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Company</td>
                  <td style="color: #111827; font-size: 14px; font-weight: 600;">${company}</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          ${enrichmentData && Object.keys(enrichmentData).length > 0 ? `
          <!-- Enrichment Data -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f0f1ff; border-bottom: 1px solid #e5e7eb;">
              <p style="margin: 0 0 16px; color: #6366f1; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                🔍 Enriched Data
              </p>

              <table width="100%" cellpadding="8" cellspacing="0">
                ${enrichmentData.companyName ? `
                <tr>
                  <td width="30%" style="color: #6b7280; font-size: 14px; font-weight: 500;">Company Name</td>
                  <td style="color: #111827; font-size: 14px; font-weight: 600;">${enrichmentData.companyName}</td>
                </tr>
                ` : ''}
                ${enrichmentData.industry ? `
                <tr>
                  <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Industry</td>
                  <td style="color: #111827; font-size: 14px; font-weight: 600;">${enrichmentData.industry}</td>
                </tr>
                ` : ''}
                ${enrichmentData.companySize ? `
                <tr>
                  <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Company Size</td>
                  <td style="color: #111827; font-size: 14px; font-weight: 600;">${enrichmentData.companySize}</td>
                </tr>
                ` : ''}
                ${enrichmentData.location ? `
                <tr>
                  <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Location</td>
                  <td style="color: #111827; font-size: 14px; font-weight: 600;">${enrichmentData.location}</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          ` : ''}

          ${attributionData ? `
          <!-- Attribution Data -->
          <tr>
            <td style="padding: 30px 40px; border-bottom: 1px solid #e5e7eb;">
              <p style="margin: 0 0 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                🎯 Attribution Journey
              </p>

              <table width="100%" cellpadding="8" cellspacing="0">
                <tr>
                  <td width="30%" style="color: #6b7280; font-size: 14px; font-weight: 500;">First Touch</td>
                  <td style="color: #111827; font-size: 14px; font-weight: 600;">${attributionData.firstTouch}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Last Touch</td>
                  <td style="color: #111827; font-size: 14px; font-weight: 600;">${attributionData.lastTouch}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Touchpoints</td>
                  <td style="color: #111827; font-size: 14px; font-weight: 600;">${attributionData.touchpointCount}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Days to Convert</td>
                  <td style="color: #111827; font-size: 14px; font-weight: 600;">${attributionData.daysSinceFirstTouch.toFixed(1)} days</td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Message -->
          <tr>
            <td style="padding: 30px 40px; border-bottom: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Message
              </p>
              <div style="background-color: #f9fafb; border-left: 4px solid #6366f1; padding: 16px; border-radius: 4px;">
                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${message}
                </p>
              </div>
            </td>
          </tr>

          <!-- Action Required -->
          <tr>
            <td style="padding: 30px 40px; background-color: ${qualified ? '#f0fdf4' : '#f9fafb'};">
              <p style="margin: 0 0 16px; color: ${qualified ? '#16a34a' : '#6b7280'}; font-size: 14px; font-weight: 700; text-transform: uppercase;">
                ${qualified ? '✅ Action Required: Follow up within 24 hours' : '📋 Review Required'}
              </p>
              <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                ${qualified
                  ? 'This is a qualified lead. Respond promptly to maximize conversion chances.'
                  : 'Review this lead and determine appropriate follow-up actions.'}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
