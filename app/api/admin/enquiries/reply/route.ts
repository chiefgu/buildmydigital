import { NextRequest, NextResponse } from 'next/server';
import { getEnquiry, markAsReplied } from '@/lib/enquiryStorage';
import { resend } from '@/lib/resend';

/**
 * POST /api/admin/enquiries/reply
 * Send a reply to an enquiry
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { enquiryId, replyMessage, replyBy } = body;

    // Validate required fields
    if (!enquiryId || !replyMessage) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the enquiry
    const enquiry = getEnquiry(enquiryId);
    if (!enquiry) {
      return NextResponse.json(
        { success: false, error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    // Send reply email via Resend
    try {
      const result = await resend.emails.send({
        from: 'BUILDMYDIGITAL <onboarding@resend.dev>', // Update with your verified domain
        to: [enquiry.email],
        subject: `Re: Your enquiry to BUILDMYDIGITAL`,
        html: generateReplyEmail(enquiry, replyMessage),
      });

      console.log('[Admin Enquiries] Reply sent:', {
        enquiryId,
        to: enquiry.email,
        resendId: result.data?.id,
      });

      // Mark enquiry as replied
      markAsReplied(enquiryId, replyMessage, replyBy || 'Admin');

      return NextResponse.json({
        success: true,
        message: 'Reply sent successfully',
        resendId: result.data?.id,
      });
    } catch (emailError) {
      console.error('[Admin Enquiries] Error sending reply email:', emailError);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[Admin Enquiries] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send reply' },
      { status: 500 }
    );
  }
}

/**
 * Generate HTML email for reply
 */
function generateReplyEmail(enquiry: any, replyMessage: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reply from BUILDMYDIGITAL</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #EF8354 0%, #d97446 100%); padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; line-height: 1.3;">
                Reply from BUILDMYDIGITAL
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Hi ${enquiry.name},
              </p>

              <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">
${replyMessage}
              </p>

              <!-- Original Message -->
              <div style="background-color: #f9fafb; border-left: 4px solid #EF8354; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                <p style="margin: 0 0 10px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  Your Original Message
                </p>
                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                  ${enquiry.message.replace(/\n/g, '<br>')}
                </p>
              </div>

              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong>The BUILDMYDIGITAL Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px; line-height: 1.5;">
                <strong>BUILDMYDIGITAL</strong><br>
                High-Converting Websites • Marketing Automation • Sales Closing
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
