const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    await contact.save();

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="color: #64748b; font-size: 12px;">
            IP: ${req.ip}<br>
            Time: ${new Date().toLocaleString()}
          </p>
        </div>
      `
    };

    // Auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting NestTech',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Reaching Out!</h2>
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you within 24-48 hours.</p>
          <p>In the meantime, you can:</p>
          <ul>
            <li>Check out my projects at <a href="https://nesttech.dev/projects">nesttech.dev/projects</a></li>
            <li>View my GitHub profile at <a href="https://github.com/nesttech">github.com/nesttech</a></li>
            <li>Connect with me on <a href="https://linkedin.com/in/nesttech">LinkedIn</a></li>
          </ul>
          <p>Best regards,<br><strong>NestTech</strong><br>Full-Stack Developer</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="color: #64748b; font-size: 12px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(autoReplyOptions)
    ]);

    res.json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Check if it's an email error
    if (error.message.includes('Invalid login') || error.message.includes('Authentication failed')) {
      return res.status(500).json({
        success: false,
        message: 'Email configuration error. Your message was saved but not emailed.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error sending message. Please try again later.'
    });
  }
});

// @route   GET /api/contact/stats
// @desc    Get contact form statistics (Admin only)
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const totalMessages = await Contact.countDocuments();
    const last7Days = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const unreadMessages = await Contact.countDocuments({ read: false });

    res.json({
      success: true,
      data: {
        totalMessages,
        last7Days,
        unreadMessages
      }
    });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

module.exports = router;