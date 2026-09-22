import nodemailer from 'nodemailer';
import multer from 'multer';

// Disable default Vercel body parser so multer can read the multipart stream
export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4.5 * 1024 * 1024, // 4.5MB limit for Vercel serverless functions
  },
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // CORS headers
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

  try {
    await runMiddleware(
      req,
      res,
      upload.fields([
        { name: 'resumeFile', maxCount: 1 },
        { name: 'portfolioFile', maxCount: 1 },
      ])
    );
  } catch (err) {
    console.error('File parsing error:', err);
    return res.status(400).json({
      success: false,
      error: err.code === 'LIMIT_FILE_SIZE' 
        ? 'Uploaded file is too large. Maximum file size is 4.5 MB.' 
        : (err.message || 'File upload parsing error.'),
    });
  }

  const { name, email, phone, experience, location, education, portfolioUrl, linkedin, message, role } = req.body || {};

  if (!name || !name.trim() || !email || !email.trim() || !phone || !phone.trim() || !role) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, phone, and role are required fields.',
    });
  }

  const clientIP = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
  const submittedOn = new Date().toLocaleString('en-US');

  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.zoho.in';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const senderEmail = process.env.SMTP_USER || 'admin@spacemeldarchitects.com';
    const smtpPass = process.env.SMTP_PASS || 'f0Jx5QZ38py8';
    const receiverEmail = process.env.RECEIVER_EMAIL || 'info@spacemeldarchitects.com';
    const domain = senderEmail.includes('@') ? senderEmail.split('@')[1] : 'spacemeldarchitects.com';

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

    const attachments = [];
    if (req.files?.resumeFile?.[0]) {
      attachments.push({
        filename: req.files.resumeFile[0].originalname,
        content: req.files.resumeFile[0].buffer,
      });
    }
    if (req.files?.portfolioFile?.[0]) {
      attachments.push({
        filename: req.files.portfolioFile[0].originalname,
        content: req.files.portfolioFile[0].buffer,
      });
    }

    const adminMessageId = `<career-admin-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@${domain}>`;
    const customerMessageId = `<career-ack-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@${domain}>`;

    const adminRecipients = ['admin@spacemeldarchitects.com', 'careers@spacemeldarchitects.com', receiverEmail].filter(
      (val, idx, arr) => arr.indexOf(val) === idx
    );

    // Email 1: Admin Notification
    const adminMailOptions = {
      from: `"SpaceMELD Careers" <${senderEmail}>`,
      replyTo: email.trim(),
      to: adminRecipients,
      subject: `New Job Application: ${name.trim()} - ${role}`,
      messageId: adminMessageId,
      headers: {
        'Auto-Submitted': 'auto-generated',
        'X-Auto-Response-Suppress': 'All',
      },
      text: `SpaceMELD Architects - New Career Application\n\nRole Applied: ${role}\nApplicant Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nExperience: ${experience || 'N/A'}\nLocation: ${location || 'N/A'}\nEducation: ${education || 'N/A'}\nPortfolio: ${portfolioUrl || 'N/A'}\nLinkedIn: ${linkedin || 'N/A'}\n\nMessage:\n${message || 'None'}\n\nSubmitted On: ${submittedOn}\nIP: ${clientIP}`,
      attachments,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Job Application</title>
</head>
<body style="margin: 0; padding: 20px; background: #f4f4f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px; background: #ffffff; border-radius: 12px; border: 1px solid #e0ded9; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <tr>
            <td style="background: #1A1412; padding: 24px 30px; text-align: left;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: 1px; text-transform: uppercase;">
                SpaceMELD Architects
              </h1>
              <p style="margin: 4px 0 0 0; color: #c48b57; font-size: 13px;">
                New Career Application: ${role}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" width="100%" style="border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; width: 38%;">Candidate Name</td>
                  <td style="padding: 12px 0; color: #111111; font-weight: 600;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777;">Email Address</td>
                  <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #c48b57; font-weight: 600; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777;">Phone</td>
                  <td style="padding: 12px 0;"><a href="tel:${phone}" style="color: #111111; font-weight: 600; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777;">Experience</td>
                  <td style="padding: 12px 0; color: #111111;">${experience || 'N/A'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777;">Location</td>
                  <td style="padding: 12px 0; color: #111111;">${location || 'N/A'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777;">Education</td>
                  <td style="padding: 12px 0; color: #111111;">${education || 'N/A'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777;">Portfolio URL</td>
                  <td style="padding: 12px 0;">${portfolioUrl ? '<a href="' + portfolioUrl + '" style="color: #c48b57;">' + portfolioUrl + '</a>' : 'Not provided'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777;">LinkedIn Profile</td>
                  <td style="padding: 12px 0;">${linkedin ? '<a href="' + linkedin + '" style="color: #c48b57;">' + linkedin + '</a>' : 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #777777;">Attachments</td>
                  <td style="padding: 12px 0; color: #111111;">${attachments.length > 0 ? attachments.map(a => a.filename).join(', ') : 'None attached'}</td>
                </tr>
              </table>

              <div style="background: #faf9f6; border-left: 4px solid #c48b57; padding: 18px 20px; border-radius: 4px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #777777; text-transform: uppercase;">
                  Additional Message
                </p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #222222; white-space: pre-wrap;">${message || 'None'}</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    };

    // Email 2: Candidate Confirmation
    const customerMailOptions = {
      from: `"SpaceMELD Architects" <${senderEmail}>`,
      replyTo: receiverEmail,
      to: email.trim(),
      subject: `Application Received: ${role} - SpaceMELD Architects`,
      messageId: customerMessageId,
      headers: {
        'Auto-Submitted': 'auto-generated',
        'X-Auto-Response-Suppress': 'All',
        'List-Unsubscribe': `<mailto:${receiverEmail}?subject=Unsubscribe>`,
      },
      text: `Dear ${name},\n\nThank you for applying for the ${role} position at SpaceMELD Architects. We have received your application and materials safely.\n\nOur design leadership team reviews applications on a rolling basis. If your experience and portfolio align with our current studio requirements, we will reach out to you directly for an interview.\n\nWarm regards,\nSpaceMELD Architects Talent Team\nBengaluru & Vellore Studios\nhttps://spacemeldarchitects.com`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f7f6f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background: #ffffff; border-radius: 10px; border: 1px solid #e5e3dd; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
          <tr>
            <td style="background-color: #1A1412; padding: 28px 32px; text-align: left; border-bottom: 3px solid #c48b57;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">
                SpaceMELD Architects
              </h1>
              <p style="margin: 6px 0 0 0; color: #d4a373; font-size: 12px;">
                Careers &amp; Talent Acquisition
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 16px; margin: 0 0 16px 0; color: #111111;">
                Hello <strong>${name}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 16px 0;">
                Thank you for applying for the <strong>${role}</strong> role at <strong>SpaceMELD Architects</strong>. We have received your application successfully.
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 24px 0;">
                Our studio leadership team will review your qualifications and portfolio. If your background matches our current openings, we will contact you directly to schedule an interview.
              </p>
              <hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0;" />
              <p style="font-size: 13px; line-height: 1.6; color: #666666; margin: 0;">
                <strong style="color: #111111;">SpaceMELD Architects Talent Team</strong><br />
                Bengaluru &amp; Vellore Studios<br />
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
      console.error('Admin career application email failed:', adminResult.reason);
    }
    if (customerResult.status === 'rejected') {
      console.error('Customer career confirmation email failed:', customerResult.reason);
    }

    if (adminResult.status === 'rejected' && customerResult.status === 'rejected') {
      throw new Error(adminResult.reason?.message || customerResult.reason?.message || 'Failed to dispatch email.');
    }

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully.',
    });
  } catch (error) {
    console.error('Careers Submission Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit application: ' + error.message,
    });
  }
}
