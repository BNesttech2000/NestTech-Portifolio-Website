const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: process.env.EMAIL_FROM_NAME || 'NestTech Portfolio',
        address: process.env.EMAIL_USER
      },
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo,
      attachments: options.attachments || []
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

const emailTemplates = {
  contactFormAdmin: (data) => ({
    subject: `New Contact Form: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-item { margin-bottom: 15px; }
          .label { font-weight: bold; color: #667eea; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>NestTech Portfolio</p>
          </div>
          <div class="content">
            <div class="info-item">
              <span class="label">Name:</span> ${data.name}
            </div>
            <div class="info-item">
              <span class="label">Email:</span> ${data.email}
            </div>
            <div class="info-item">
              <span class="label">Subject:</span> ${data.subject}
            </div>
            <div class="info-item">
              <span class="label">Message:</span>
              <p>${data.message}</p>
            </div>
            <div class="footer">
              <p>IP Address: ${data.ip}</p>
              <p>User Agent: ${data.userAgent}</p>
              <p>Timestamp: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),
  
  contactFormAutoReply: (data) => ({
    subject: 'Thank you for contacting NestTech',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .cta { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Contacting NestTech!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            
            <p>Thank you for reaching out! I've received your message and will review it shortly.</p>
            
            <div class="cta">
              <h3>What happens next?</h3>
              <ul>
                <li>I'll review your message within 24 hours</li>
                <li>You'll receive a detailed response based on your inquiry</li>
                <li>If needed, we can schedule a call to discuss further</li>
              </ul>
            </div>
            
            <p>In the meantime, you can:</p>
            <ul>
              <li>Check out my projects at <a href="https://nesttech.dev/projects">nesttech.dev/projects</a></li>
              <li>View my GitHub profile at <a href="https://github.com/nesttech">github.com/nesttech</a></li>
              <li>Download my resume <a href="https://nesttech.dev/resume.pdf">here</a></li>
            </ul>
            
            <p style="text-align: center;">
              <a href="https://nesttech.dev" class="button">Visit My Portfolio</a>
            </p>
            
            <div class="footer">
              <p>Best regards,<br><strong>NestTech</strong><br>Full-Stack Developer</p>
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

module.exports = { sendEmail, emailTemplates };