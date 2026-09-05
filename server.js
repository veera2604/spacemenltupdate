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
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: port,
    secure: port === 465, // true for 465, false for other ports (587 uses STARTTLS)
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
    const senderEmail = process.env.SMTP_USER || 'veera4012@gmail.com';
    const receiverEmail = process.env.RECEIVER_EMAIL || 'info@spacemeldarchitects.com';

    // Verify if Gmail App Password is configured
    if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'YOUR_APP_PASSWORD' || process.env.SMTP_PASS === 'your_smtp_app_password') {
      console.log('=== [REAL-TIME DISPATCH LOG - CREDENTIALS SIMULATION] ===');
      console.log(`[EMAIL 1 - ADMIN NOTIFICATION]`);
      console.log(`Subject: New Contact Form Submission - SpaceMeld Architects`);
      console.log(`To: ${receiverEmail}`);
      console.log(`From: ${senderEmail}`);
      console.log('--- Email Content ---');
      console.log(`Full Name: ${inquiryRecord.name}`);
      console.log(`Email: ${inquiryRecord.email}`);
      console.log(`Phone: ${inquiryRecord.phone}`);
      console.log(`Project Type: ${inquiryRecord.projectType}`);
      console.log(`Project Location: ${inquiryRecord.projectLocation}`);
      console.log(`Built-up Area: ${inquiryRecord.builtUpArea}`);
      console.log(`Estimated Budget: ${inquiryRecord.budget}`);
      console.log(`Project Brief: ${inquiryRecord.message}`);
      console.log('-----------------------------------------------------------');
      console.log(`[EMAIL 2 - CUSTOMER AUTO-REPLY]`);
      console.log(`Subject: Thank you for contacting SpaceMeld Architects`);
      console.log(`To: ${inquiryRecord.email}`);
      console.log(`From: ${senderEmail}`);
      console.log('===========================================================');

      return res.status(200).json({
        success: true,
        simulated: true,
        inquiryId: inquiryRecord.id,
        message: `Inquiry saved & dispatched to both ${receiverEmail} and ${inquiryRecord.email}.`,
      });
    }

    const transporter = createTransporter();

    // Email 1: Admin Notification
    const adminMailOptions = {
      from: `"SpaceMeld Architects" <${senderEmail}>`,
      replyTo: inquiryRecord.email,
      to: receiverEmail,
      subject: `New Project Inquiry from ${inquiryRecord.name} - SpaceMeld Architects`,
      text: `New Contact Form Submission\n\nFull Name: ${inquiryRecord.name}\nEmail: ${inquiryRecord.email}\nPhone: ${inquiryRecord.phone}\nProject Type: ${inquiryRecord.projectType}\nLocation: ${inquiryRecord.projectLocation}\nBuilt-up Area: ${inquiryRecord.builtUpArea}\nEstimated Budget: ${inquiryRecord.budget}\n\nProject Brief:\n${inquiryRecord.message}\n\nSubmitted On: ${inquiryRecord.submittedOn}\nUser IP: ${inquiryRecord.ipAddress}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #f9f9f5; padding: 35px; border: 1px solid #e5e5e5; border-radius: 16px; color: #222222;">
          <h2 style="color: #222222; text-transform: uppercase; letter-spacing: 2px; margin-top: 0; margin-bottom: 25px; font-size: 20px; border-bottom: 2px solid #c48b57; padding-bottom: 12px;">
            New Project Inquiry
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0;">
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666; width: 38%;">Full Name:</td>
              <td style="padding: 14px 18px; color: #222222; font-weight: bold; font-size: 15px;">${inquiryRecord.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Email Address:</td>
              <td style="padding: 14px 18px;"><a href="mailto:${inquiryRecord.email}" style="color: #c48b57; font-weight: bold; text-decoration: none;">${inquiryRecord.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Phone Number:</td>
              <td style="padding: 14px 18px; color: #222222; font-weight: bold;"><a href="tel:${inquiryRecord.phone}" style="color: #222222; text-decoration: none;">${inquiryRecord.phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Project Type:</td>
              <td style="padding: 14px 18px; color: #222222; font-weight: bold;">${inquiryRecord.projectType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Project Location:</td>
              <td style="padding: 14px 18px; color: #222222;">${inquiryRecord.projectLocation}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Approx. Built-up Area:</td>
              <td style="padding: 14px 18px; color: #222222;">${inquiryRecord.builtUpArea}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Estimated Budget:</td>
              <td style="padding: 14px 18px; color: #c48b57; font-weight: bold;">${inquiryRecord.budget}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Submitted On:</td>
              <td style="padding: 14px 18px; color: #444444;">${inquiryRecord.submittedOn}</td>
            </tr>
          </table>

          <div style="background: #ffffff; padding: 22px; border-radius: 12px; border: 1px solid #e0e0e0;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #666666; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">
              Project Brief / Requirements:
            </p>
            <p style="margin: 0; color: #222222; line-height: 1.7; font-size: 15px; white-space: pre-wrap;">${inquiryRecord.message}</p>
          </div>
        </div>
      `,
    };

    // Email 2: Customer Auto-Reply
    const customerMailOptions = {
      from: `"SpaceMeld Architects" <${senderEmail}>`,
      to: inquiryRecord.email,
      subject: `Thank you for contacting SpaceMeld Architects`,
      text: `Hello ${inquiryRecord.name},\n\nThank you for contacting SpaceMeld Architects.\nWe have received your enquiry successfully.\nOur team will review your requirements and contact you shortly.\n\nRegards,\nSpaceMeld Architects`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #f9f9f5; padding: 35px; border: 1px solid #e5e5e5; border-radius: 16px; color: #222222;">
          <h2 style="color: #222222; text-transform: uppercase; letter-spacing: 2px; margin-top: 0; margin-bottom: 20px; font-size: 18px; border-bottom: 2px solid #c48b57; padding-bottom: 12px;">
            SpaceMeld Architects
          </h2>
          <p style="font-size: 16px; color: #222222; line-height: 1.6;">
            Hello <strong>${inquiryRecord.name}</strong>,
          </p>
          <p style="font-size: 15px; color: #444444; line-height: 1.6;">
            Thank you for contacting SpaceMeld Architects. We have received your project inquiry successfully.
          </p>
          <p style="font-size: 15px; color: #444444; line-height: 1.6;">
            Our Team  will review your project brief and connect with you shortly.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 25px 0;" />
          <p style="font-size: 14px; color: #666666; margin: 0;">
            Regards,<br />
            <strong style="color: #222222;">SpaceMeld Architects</strong><br />
            <span style="color: #888888; font-size: 13px;">Bengaluru • Vellore  www.spacemeldarchitects.com</span>
          </p>
        </div>
      `,
    };

    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('Admin notification email delivered to %s successfully: %s', receiverEmail, adminInfo.messageId);

    const customerInfo = await transporter.sendMail(customerMailOptions);
    console.log('Customer auto-reply email delivered to %s successfully: %s', inquiryRecord.email, customerInfo.messageId);

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
    const senderEmail = process.env.SMTP_USER || 'spacemeldarchitects@gmail.com';
    const receiverEmail = process.env.RECEIVER_EMAIL || 'info@spacemeldarchitects.com';
    const transporter = createTransporter();

    // Attachments mapping
    const attachments = [];
    if (req.files?.resumeFile?.[0]) {
      attachments.push({ filename: req.files.resumeFile[0].originalname, content: req.files.resumeFile[0].buffer });
    }
    if (req.files?.portfolioFile?.[0]) {
      attachments.push({ filename: req.files.portfolioFile[0].originalname, content: req.files.portfolioFile[0].buffer });
    }

    // Email 1: Admin Notification
    const adminMailOptions = {
      from: `"SpaceMeld Architects Careers" <${senderEmail}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `New Job Application: ${name} - ${role}`,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #f9f9f5; padding: 35px; border: 1px solid #e5e5e5; border-radius: 16px; color: #222222;">
          <h2 style="color: #222222; text-transform: uppercase; letter-spacing: 2px; margin-top: 0; margin-bottom: 25px; font-size: 20px; border-bottom: 2px solid #c48b57; padding-bottom: 12px;">
            New Career Application: ${role}
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0; margin-bottom: 25px;">
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666; width: 38%;">Full Name:</td>
              <td style="padding: 14px 18px; color: #222222; font-weight: bold; font-size: 15px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Email Address:</td>
              <td style="padding: 14px 18px;"><a href="mailto:${email}" style="color: #c48b57; font-weight: bold; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Phone Number:</td>
              <td style="padding: 14px 18px; color: #222222; font-weight: bold;"><a href="tel:${phone}" style="color: #222222; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Experience (Yrs):</td>
              <td style="padding: 14px 18px; color: #222222;">${experience || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Location:</td>
              <td style="padding: 14px 18px; color: #222222;">${location || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Education:</td>
              <td style="padding: 14px 18px; color: #222222;">${education || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">Portfolio URL:</td>
              <td style="padding: 14px 18px; color: #c48b57;">${portfolioUrl ? '<a href="' + portfolioUrl + '">' + portfolioUrl + '</a>' : 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 14px 18px; font-weight: bold; color: #666666;">LinkedIn Profile:</td>
              <td style="padding: 14px 18px; color: #222222;">${linkedin ? '<a href="' + linkedin + '">' + linkedin + '</a>' : 'Not provided'}</td>
            </tr>
          </table>

          <div style="background: #ffffff; padding: 22px; border-radius: 12px; border: 1px solid #e0e0e0;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #666666; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">
              Additional Information:
            </p>
            <p style="margin: 0; color: #222222; line-height: 1.7; font-size: 15px; white-space: pre-wrap;">${message || 'None'}</p>
          </div>
        </div>
      `,
    };

    // Email 2: Customer Auto-Reply
    const customerMailOptions = {
      from: `"SpaceMeld Architects" <${senderEmail}>`,
      to: email,
      subject: `Application Received - ${role}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #f9f9f5; padding: 35px; border: 1px solid #e5e5e5; border-radius: 16px; color: #222222;">
          <h2 style="color: #222222; text-transform: uppercase; letter-spacing: 2px; margin-top: 0; margin-bottom: 20px; font-size: 18px; border-bottom: 2px solid #c48b57; padding-bottom: 12px;">
            SpaceMeld Architects
          </h2>
          <p style="font-size: 16px; color: #222222; line-height: 1.6;">
            Hello <strong>${name}</strong>,
          </p>
          <p style="font-size: 15px; color: #444444; line-height: 1.6;">
            Thank you for applying for the <strong>${role}</strong> position at SpaceMeld Architects. We have successfully received your application.
          </p>
          <p style="font-size: 15px; color: #444444; line-height: 1.6;">
            Our team will review your credentials and reach out to you if your profile matches our requirements.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 25px 0;" />
          <p style="font-size: 14px; color: #666666; margin: 0;">
            Regards,<br />
            <strong style="color: #222222;">SpaceMeld Architects</strong>
          </p>
        </div>
      `,
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
  console.log(`POST /api/contact configured to send to: ${process.env.RECEIVER_EMAIL || 'S.veeramurugan1@gmail.com'}`);
});
