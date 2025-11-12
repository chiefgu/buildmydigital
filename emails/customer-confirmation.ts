interface CustomerConfirmationProps {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export function customerConfirmationEmail({
  name,
  email,
  company,
  message,
}: CustomerConfirmationProps) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for reaching out!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #EF8354 0%, #d97446 100%); padding: 40px 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="background-color: #000000; border-radius: 12px; padding: 8px; display: inline-block; width: 40px; height: 40px;">
                      <!-- Logo placeholder - you can replace with img tag -->
                      <div style="width: 24px; height: 24px; background-color: #ffffff;"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.3;">
                      Thanks for reaching out!
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Hi ${name},
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                We've received your message and someone from our team will get back to you within 24 hours.
              </p>

              <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to check out our case studies and learn how we've helped businesses like yours scale their revenue.
              </p>

              <!-- Message recap -->
              <div style="background-color: #f9fafb; border-left: 4px solid #EF8354; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                <p style="margin: 0 0 10px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  Your Message
                </p>
                ${company ? `
                <p style="margin: 0 0 8px; color: #374151; font-size: 14px;">
                  <strong>Company:</strong> ${company}
                </p>
                ` : ''}
                <p style="margin: 0 0 8px; color: #374151; font-size: 14px;">
                  <strong>Email:</strong> ${email}
                </p>
                <p style="margin: 0; color: #374151; font-size: 14px; padding-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="background-color: #EF8354; border-radius: 9999px; padding: 14px 32px; text-align: center;">
                    <a href="https://buildmydigital.com" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block;">
                      View Our Work
                    </a>
                  </td>
                </tr>
              </table>

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
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                You're receiving this email because you contacted us through our website.
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
