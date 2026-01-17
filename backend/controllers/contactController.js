// backend/controllers/contactController.js
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    
    // Save to database
    const contact = new Contact({
      name,
      email,
      message,
      subject: subject || 'Portfolio Inquiry',
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    await contact.save();
    
    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.PERSONAL_EMAIL,
      subject: `New Portfolio Message: ${subject || 'Inquiry'}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>IP: ${req.ip}</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    // Auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for reaching out - NestTech',
      html: `
        <h3>Thank you for your message!</h3>
        <p>Hi ${name},</p>
        <p>I've received your message and will get back to you within 24-48 hours.</p>
        <p>Best regards,<br>NestTech</p>
      `
    };
    
    await transporter.sendMail(autoReplyOptions);
    
    res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message'
    });
  }
};