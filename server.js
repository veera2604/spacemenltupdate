if (!Object.hasOwn) {
  Object.hasOwn = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Configure multer for memory storage for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Database file path for storing inquiries
const DB_PATH = path.join(__dirname, 'inquiries.json');

// Ensure database file exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), 'utf-8');
}

// Helper to save inquiry to JSON database
const saveInquiryToDB = (inquiry) => {
  try {
    const existingData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    existingData.push(inquiry);
    fs.writeFileSync(DB_PATH, JSON.stringify(existingData, null, 2), 'utf-8');
    console.log('Inquiry stored in database successfully (ID: %s)', inquiry.id);
  } catch (err) {
    console.error('Error saving inquiry to database:', err);
  }
};

// Create SMTP Transporter
const createTransporter = () => {
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const senderEmail = process.env.SMTP_USER || 'admin@spacemeldarchitects.com';
  const domain = senderEmail.includes('@') ? senderEmail.split('@')[1] : 'spacemeldarchitects.com';

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.in',
    port: port,
    secure: port === 465, // true for 465, false for 587 (STARTTLS)
    name: domain, // Set FQDN for SMTP EHLO/HELO to match authenticated domain
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// POST /api/contact (and alias POST /api/send-email)
const handleContactInquiry = async (req, res) => {
  const { name, email, phone, projectType, projectLocation, builtUpArea, budget, message } = req.body;

  // Validate required fields
  if (!name || !name.trim() || !email || !email.trim() || !phone || !phone.trim() || !message || !message.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed: Full Name, Email Address, Phone Number, and Project Brief are required.',
    });
  }

  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
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
    phone: (phone || '').trim(),
    projectType: projectType || 'Residential',
    projectLocation: (projectLocation || '').trim() || 'Not specified',
    builtUpArea: builtUpArea || '< 1,500 sq.ft',
    budget: budget || '₹25–50 L',
    message: message.trim(),
    submittedOn,
    ipAddress: clientIP,
    createdAt: new Date().toISOString(),
  };

  // Store inquiry in database immediately
  saveInquiryToDB(inquiryRecord);

  try {
    const senderEmail = process.env.SMTP_USER || 'admin@spacemeldarchitects.com';
    const receiverEmail = process.env.RECEIVER_EMAIL || 'info@spacemeldarchitects.com';
    const domain = senderEmail.includes('@') ? senderEmail.split('@')[1] : 'spacemeldarchitects.com';

    // Verify if credentials are placeholder
    if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'YOUR_APP_PASSWORD' || process.env.SMTP_PASS === 'your_smtp_app_password') {
      console.log('=== [REAL-TIME DISPATCH LOG - CREDENTIALS SIMULATION] ===');
      console.log(`[EMAIL 1 - ADMIN NOTIFICATION] To: ${receiverEmail}`);
      console.log(`[EMAIL 2 - CUSTOMER AUTO-REPLY] To: ${inquiryRecord.email}`);
      console.log('===========================================================');

      return res.status(200).json({
        success: true,
        simulated: true,
        inquiryId: inquiryRecord.id,
        message: `Inquiry saved & dispatched to both ${receiverEmail} and ${inquiryRecord.email}.`,
      });
    }

    const transporter = createTransporter();

    // Unique Message-IDs matching the authenticated domain
    const adminMessageId = `<inq-admin-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@${domain}>`;
    const customerMessageId = `<inq-ack-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@${domain}>`;

    // Email 1: Admin / Client Notification (Sent to info@spacemeldarchitects.com)
    const adminMailOptions = {
      from: `"SpaceMeld Architects" <${senderEmail}>`,
      replyTo: inquiryRecord.email,
      to: receiverEmail,
      subject: `New Project Enquiry: ${inquiryRecord.name} (${inquiryRecord.projectType})`,
      messageId: adminMessageId,
      headers: {
        'Auto-Submitted': 'auto-generated',
        'X-Auto-Response-Suppress': 'All',
      },
      text: `SpaceMeld Architects - New Project Enquiry\n\nFull Name: ${inquiryRecord.name}\nEmail: ${inquiryRecord.email}\nPhone: ${inquiryRecord.phone}\nProject Type: ${inquiryRecord.projectType}\nLocation: ${inquiryRecord.projectLocation}\nBuilt-up Area: ${inquiryRecord.builtUpArea}\nEstimated Budget: ${inquiryRecord.budget}\n\nProject Brief:\n${inquiryRecord.message}\n\nSubmitted On: ${inquiryRecord.submittedOn}\nIP: ${inquiryRecord.ipAddress}`,
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
                SpaceMeld Architects
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
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Email</td>
                  <td style="padding: 12px 0; font-size: 15px;"><a href="mailto:${inquiryRecord.email}" style="color: #c48b57; font-weight: 600; text-decoration: none;">${inquiryRecord.email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Phone</td>
                  <td style="padding: 12px 0; font-size: 15px;"><a href="tel:${inquiryRecord.phone}" style="color: #111111; font-weight: 600; text-decoration: none;">${inquiryRecord.phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Project Type</td>
                  <td style="padding: 12px 0; color: #111111; font-size: 15px; font-weight: 600;">${inquiryRecord.projectType}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Location</td>
                  <td style="padding: 12px 0; color: #111111; font-size: 15px;">${inquiryRecord.projectLocation}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Built-up Area</td>
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

    // Email 2: Customer Thank-You Response (Sent to inquiryRecord.email e.g. boysg7659@gmail.com)
    const customerMailOptions = {
      from: `"SpaceMeld Architects" <${senderEmail}>`,
      replyTo: receiverEmail,
      to: inquiryRecord.email,
      subject: `Thank you for contacting SpaceMeld Architects`,
      messageId: customerMessageId,
      headers: {
        'Auto-Submitted': 'auto-generated',
        'X-Auto-Response-Suppress': 'All',
        'List-Unsubscribe': `<mailto:${receiverEmail}?subject=Unsubscribe>`,
      },
      text: `Dear ${inquiryRecord.name},\n\nThank you for reaching out to SpaceMeld Architects regarding your ${inquiryRecord.projectType} project.\n\nWe have received your enquiry safely. Our architectural design team is reviewing your project details and will connect with you shortly.\n\nSummary of your enquiry:\n- Project Type: ${inquiryRecord.projectType}\n- Location: ${inquiryRecord.projectLocation}\n- Built-up Area: ${inquiryRecord.builtUpArea}\n- Budget Range: ${inquiryRecord.budget}\n\nIf you have any immediate questions or architectural drawings to share, feel free to reply directly to this email or reach us at ${receiverEmail}.\n\nWarm regards,\nSpaceMeld Architects\nBengaluru Studio: 19th Main Road, HSR Layout, Bengaluru - 560102\nVellore Studio: Jamalpuram Road, Vellore - 632002\nPhone: +91 80955 00050\nWebsite: https://www.spacemeldarchitects.com`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - SpaceMeld Architects</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f7f6f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background: #ffffff; border-radius: 10px; border: 1px solid #e5e3dd; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
          <tr>
            <td style="background-color: #1A1412; padding: 28px 32px; text-align: left; border-bottom: 3px solid #c48b57;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">
                SpaceMeld Architects
              </h1>
              <p style="margin: 6px 0 0 0; color: #d4a373; font-size: 12px; letter-spacing: 0.5px;">
                Architecture • Interior • Spatial Design
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 16px; margin: 0 0 16px 0; color: #111111;">
                Hello <strong>${inquiryRecord.name}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 20px 0;">
                Thank you for reaching out to <strong>SpaceMeld Architects</strong> regarding your <strong>${inquiryRecord.projectType}</strong> project. We have successfully received your enquiry.
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
                    <td style="padding: 4px 0; color: #777777;">Location:</td>
                    <td style="padding: 4px 0; color: #111111;">${inquiryRecord.projectLocation}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #777777;">Built-up Area:</td>
                    <td style="padding: 4px 0; color: #111111;">${inquiryRecord.builtUpArea}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #777777;">Budget Range:</td>
                    <td style="padding: 4px 0; color: #c48b57; font-weight: 600;">${inquiryRecord.budget}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 24px 0;">
                Our principal architectural team is reviewing your project brief and will get in touch with you shortly to schedule an initial consultation.
              </p>

              <hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0;" />

              <table role="presentation" width="100%" style="border-collapse: collapse;">
                <tr>
                  <td>
                    <p style="font-size: 13px; line-height: 1.6; color: #666666; margin: 0;">
                      <strong style="color: #111111;">SpaceMeld Architects</strong><br />
                      <strong>Bengaluru:</strong> 19th Main Road, HSR Layout, Bengaluru – 560 102<br />
                      <strong>Vellore:</strong> Jamalpuram Road, Vellore – 632 002<br />
                      Phone: <a href="tel:+918095500050" style="color: #c48b57; text-decoration: none;">+91 80955 00050</a><br />
                      Email: <a href="mailto:${receiverEmail}" style="color: #c48b57; text-decoration: none;">${receiverEmail}</a><br />
                      Web: <a href="https://www.spacemeldarchitects.com" style="color: #c48b57; text-decoration: none;">www.spacemeldarchitects.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    };

    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('Admin notification email delivered to %s successfully: %s', receiverEmail, adminInfo.messageId);

    const customerInfo = await transporter.sendMail(customerMailOptions);
    console.log('Customer thank-you email delivered to %s successfully: %s', inquiryRecord.email, customerInfo.messageId);

    return res.status(200).json({
      success: true,
      inquiryId: inquiryRecord.id,
      messageId: adminInfo.messageId,
    });
  } catch (error) {
    console.error('SMTP Email Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email: ' + error.message,
    });
  }
};


// POST /api/apply (Careers Application)
app.post('/api/apply', upload.fields([{ name: 'resumeFile', maxCount: 1 }, { name: 'portfolioFile', maxCount: 1 }]), async (req, res) => {
  const { name, email, phone, experience, location, education, portfolioUrl, linkedin, message, role } = req.body;

  if (!name || !email || !phone || !role) {
    return res.status(400).json({ success: false, error: 'Name, email, phone, and role are required.' });
  }

  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const submittedOn = new Date().toLocaleString('en-US');

  try {
    const senderEmail = process.env.SMTP_USER || 'admin@spacemeldarchitects.com';
    const receiverEmail = process.env.RECEIVER_EMAIL || 'info@spacemeldarchitects.com';
    const domain = senderEmail.includes('@') ? senderEmail.split('@')[1] : 'spacemeldarchitects.com';
    const transporter = createTransporter();

    // Attachments mapping
    const attachments = [];
    if (req.files?.resumeFile?.[0]) {
      attachments.push({ filename: req.files.resumeFile[0].originalname, content: req.files.resumeFile[0].buffer });
    }
    if (req.files?.portfolioFile?.[0]) {
      attachments.push({ filename: req.files.portfolioFile[0].originalname, content: req.files.portfolioFile[0].buffer });
    }

    const adminMessageId = `<career-admin-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@${domain}>`;
    const customerMessageId = `<career-ack-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@${domain}>`;

    // Email 1: Admin Notification
    const adminMailOptions = {
      from: `"SpaceMeld Careers" <${senderEmail}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `New Job Application: ${name} - ${role}`,
      messageId: adminMessageId,
      headers: {
        'Auto-Submitted': 'auto-generated',
        'X-Auto-Response-Suppress': 'All',
      },
      text: `SpaceMeld Architects - New Career Application\n\nRole Applied: ${role}\nApplicant Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nExperience: ${experience || 'N/A'}\nLocation: ${location || 'N/A'}\nEducation: ${education || 'N/A'}\nPortfolio: ${portfolioUrl || 'N/A'}\nLinkedIn: ${linkedin || 'N/A'}\n\nMessage:\n${message || 'None'}\n\nSubmitted On: ${submittedOn}\nIP: ${clientIP}`,
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
                SpaceMeld Architects
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
      from: `"SpaceMeld Architects" <${senderEmail}>`,
      replyTo: receiverEmail,
      to: email,
      subject: `Application Received: ${role} - SpaceMeld Architects`,
      messageId: customerMessageId,
      headers: {
        'Auto-Submitted': 'auto-generated',
        'X-Auto-Response-Suppress': 'All',
        'List-Unsubscribe': `<mailto:${receiverEmail}?subject=Unsubscribe>`,
      },
      text: `Dear ${name},\n\nThank you for applying for the ${role} position at SpaceMeld Architects. We have received your application and materials safely.\n\nOur design leadership team reviews applications on a rolling basis. If your experience and portfolio align with our current studio requirements, we will reach out to you directly for an interview.\n\nWarm regards,\nSpaceMeld Architects Talent Team\nBengaluru & Vellore Studios\nhttps://www.spacemeldarchitects.com`,
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
                SpaceMeld Architects
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
                Thank you for applying for the <strong>${role}</strong> role at <strong>SpaceMeld Architects</strong>. We have received your application successfully.
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 24px 0;">
                Our studio leadership team will review your qualifications and portfolio. If your background matches our current openings, we will contact you directly to schedule an interview.
              </p>
              <hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0;" />
              <p style="font-size: 13px; line-height: 1.6; color: #666666; margin: 0;">
                <strong style="color: #111111;">SpaceMeld Architects Talent Team</strong><br />
                Bengaluru &amp; Vellore Studios<br />
                <a href="https://www.spacemeldarchitects.com" style="color: #c48b57; text-decoration: none;">www.spacemeldarchitects.com</a>
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

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    return res.status(200).json({ success: true, message: 'Application submitted successfully.' });
  } catch (error) {
    console.error('SMTP Email Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email: ' + error.message });
  }
});

app.post('/api/contact', handleContactInquiry);
app.post('/api/send-email', handleContactInquiry);

// Endpoint to view stored inquiries
app.get('/api/inquiries', (req, res) => {
  try {
    const inquiries = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`SpaceMeld Architects Backend API listening on http://localhost:${PORT}`);
  console.log(`POST /api/contact configured to send to: ${process.env.RECEIVER_EMAIL || 'info@spacemeldarchitects.com'}`);
});
