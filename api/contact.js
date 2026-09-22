import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      // fallback
    }
  }

  const { name, email, phone, projectType, projectLocation, builtUpArea, budget, message } = body || {};

  // Requirement 9: Proper validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Full Name is required.' });
  }
  if (!email || !email.trim() || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ success: false, error: 'Phone number is required.' });
  }
  if (!projectType || !projectType.trim()) {
    return res.status(400).json({ success: false, error: 'Project type is required.' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Project brief is required.' });
  }

  const clientIP = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
  const submittedOn = new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const inquiryRecord = {
    id: `INQ-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    projectType: projectType.trim(),
    projectLocation: (projectLocation || '').trim() || 'Not specified',
    builtUpArea: builtUpArea || '< 1,500 sq.ft',
    budget: budget || '₹25–50 L',
    message: message.trim(),
    submittedOn,
    ipAddress: clientIP,
  };

  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.zoho.in';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const senderEmail = process.env.SMTP_USER || 'admin@spacemeldarchitects.com';
    const smtpPass = process.env.SMTP_PASS || 'f0Jx5QZ38py8';
    const receiverEmail = process.env.RECEIVER_EMAIL || 'info@spacemeldarchitects.com';
    const domain = senderEmail.includes('@') ? senderEmail.split('@')[1] : 'spacemeldarchitects.com';

    // Requirement 14: SMTP over SSL/TLS (port 465)
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      name: domain,
      auth: {
        user: senderEmail,
        pass: smtpPass,
      },
    });

    const adminMessageId = `<inq-admin-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@${domain}>`;
    const customerMessageId = `<inq-ack-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@${domain}>`;

    // Requirement 2 & 3: Send to admin@spacemeldarchitects.com AND info@spacemeldarchitects.com
    const adminRecipients = ['admin@spacemeldarchitects.com', receiverEmail].filter(
      (val, idx, arr) => arr.indexOf(val) === idx
    );

    // Requirement 5: Clean, professional HTML with all submitted details
    const adminMailOptions = {
      from: `"SpaceMELD Architects Website" <${senderEmail}>`,
      replyTo: inquiryRecord.email,
      to: adminRecipients,
      subject: `New Project Enquiry: ${inquiryRecord.name} (${inquiryRecord.projectType})`,
      messageId: adminMessageId,
      headers: {
        'Auto-Submitted': 'auto-generated',
        'X-Auto-Response-Suppress': 'All',
      },
      text: `SpaceMELD Architects - New Project Enquiry\n\nFull Name: ${inquiryRecord.name}\nEmail: ${inquiryRecord.email}\nPhone: ${inquiryRecord.phone}\nProject Type: ${inquiryRecord.projectType}\nLocation: ${inquiryRecord.projectLocation}\nBuilt-up Area: ${inquiryRecord.builtUpArea}\nEstimated Budget: ${inquiryRecord.budget}\n\nProject Brief:\n${inquiryRecord.message}\n\nSubmitted On: ${inquiryRecord.submittedOn}\nIP: ${inquiryRecord.ipAddress}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Enquiry</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f4f4f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 12px; border: 1px solid #e0ded9; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <tr>
            <td style="background: #1A1412; padding: 24px 30px; text-align: left;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: 1px; text-transform: uppercase;">
                SpaceMELD Architects
              </h1>
              <p style="margin: 4px 0 0 0; color: #c48b57; font-size: 13px; letter-spacing: 0.5px;">
                New Website Lead / Project Enquiry
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" width="100%" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px; width: 38%;">Client Name</td>
                  <td style="padding: 12px 0; color: #111111; font-size: 15px; font-weight: 600;">${inquiryRecord.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Email Address</td>
                  <td style="padding: 12px 0; font-size: 15px;"><a href="mailto:${inquiryRecord.email}" style="color: #c48b57; font-weight: 600; text-decoration: none;">${inquiryRecord.email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Phone Number</td>
                  <td style="padding: 12px 0; font-size: 15px;"><a href="tel:${inquiryRecord.phone}" style="color: #111111; font-weight: 600; text-decoration: none;">${inquiryRecord.phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Project Type</td>
                  <td style="padding: 12px 0; color: #111111; font-size: 15px; font-weight: 600;">${inquiryRecord.projectType}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Project Location</td>
                  <td style="padding: 12px 0; color: #111111; font-size: 15px;">${inquiryRecord.projectLocation}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Approx. Built-up Area</td>
                  <td style="padding: 12px 0; color: #111111; font-size: 15px;">${inquiryRecord.builtUpArea}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Estimated Budget</td>
                  <td style="padding: 12px 0; color: #c48b57; font-size: 15px; font-weight: 600;">${inquiryRecord.budget}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #777777; font-size: 13px;">Submitted On</td>
                  <td style="padding: 12px 0; color: #555555; font-size: 13px;">${inquiryRecord.submittedOn}</td>
                </tr>
              </table>

              <div style="background: #faf9f6; border-left: 4px solid #c48b57; padding: 18px 20px; border-radius: 4px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #777777; text-transform: uppercase; letter-spacing: 0.5px;">
                  Project Brief &amp; Requirements
                </p>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #222222; white-space: pre-wrap;">${inquiryRecord.message}</p>
              </div>

              <p style="margin: 0; font-size: 13px; color: #888888; text-align: center;">
                Click "Reply" to email ${inquiryRecord.name} directly at ${inquiryRecord.email}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    };

    // Requirement 4 & 6: Automatic confirmation email to user (without exposing internal details)
    const customerMailOptions = {
      from: `"SpaceMELD Architects" <${senderEmail}>`,
      replyTo: receiverEmail,
      to: inquiryRecord.email,
      subject: 'Thank You for Contacting SpaceMELD Architects',
      messageId: customerMessageId,
      headers: {
        'Auto-Submitted': 'auto-generated',
        'X-Auto-Response-Suppress': 'All',
        'List-Unsubscribe': `<mailto:${receiverEmail}?subject=Unsubscribe>`,
      },
      text: `Hi ${inquiryRecord.name},\n\nThank you for contacting SpaceMELD Architects.\n\nWe have received your enquiry and our team will review your requirements and get back to you shortly.\n\nProject Type: ${inquiryRecord.projectType}\nProject Location: ${inquiryRecord.projectLocation}\n\nRegards,\nSpaceMELD Architects\nhttps://spacemeldarchitects.com`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - SpaceMELD Architects</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f7f6f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background: #ffffff; border-radius: 10px; border: 1px solid #e5e3dd; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
          <tr>
            <td style="background-color: #1A1412; padding: 28px 32px; text-align: left; border-bottom: 3px solid #c48b57;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">
                SpaceMELD Architects
              </h1>
              <p style="margin: 6px 0 0 0; color: #d4a373; font-size: 12px; letter-spacing: 0.5px;">
                Architecture • Interior • Spatial Design
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 16px; margin: 0 0 16px 0; color: #111111;">
                Hi <strong>${inquiryRecord.name}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 16px 0;">
                Thank you for contacting <strong>SpaceMELD Architects</strong>.
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 20px 0;">
                We have received your enquiry and our team will review your requirements and get back to you shortly.
              </p>

              <div style="background-color: #faf8f5; border: 1px solid #eee8df; border-left: 4px solid #c48b57; border-radius: 6px; padding: 16px 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #222222; text-transform: uppercase; letter-spacing: 0.5px;">
                  Enquiry Details:
                </p>
                <table role="presentation" width="100%" style="border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 4px 0; color: #777777; width: 40%;">Project Type:</td>
                    <td style="padding: 4px 0; color: #111111; font-weight: 600;">${inquiryRecord.projectType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #777777;">Project Location:</td>
                    <td style="padding: 4px 0; color: #111111;">${inquiryRecord.projectLocation}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #777777;">Approx. Built-up Area:</td>
                    <td style="padding: 4px 0; color: #111111;">${inquiryRecord.builtUpArea}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #777777;">Estimated Budget:</td>
                    <td style="padding: 4px 0; color: #c48b57; font-weight: 600;">${inquiryRecord.budget}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 24px 0;">
                Regards,<br />
                <strong style="color: #111111;">SpaceMELD Architects</strong><br />
                <a href="https://spacemeldarchitects.com" style="color: #c48b57; text-decoration: none;">https://spacemeldarchitects.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    };

    const [adminResult, customerResult] = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    if (adminResult.status === 'rejected') {
      console.error('Admin email dispatch error:', adminResult.reason);
    } else {
      console.log('Admin notification delivered to %s: %s', adminRecipients.join(', '), adminResult.value?.messageId);
    }

    if (customerResult.status === 'rejected') {
      console.error('Customer confirmation email dispatch error:', customerResult.reason);
    } else {
      console.log('Customer confirmation delivered to %s: %s', inquiryRecord.email, customerResult.value?.messageId);
    }

    // Requirement 10: If both fail, return error response
    if (adminResult.status === 'rejected' && customerResult.status === 'rejected') {
      throw new Error(adminResult.reason?.message || customerResult.reason?.message || 'Failed to dispatch emails.');
    }

    return res.status(200).json({
      success: true,
      inquiryId: inquiryRecord.id,
      adminDelivered: adminResult.status === 'fulfilled',
      customerDelivered: customerResult.status === 'fulfilled',
      message: 'Thank you! Your enquiry has been submitted successfully. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact Form Email Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email: ' + error.message,
    });
  }
}
