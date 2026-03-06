const nodemailer = require('nodemailer');
const logger = require('../config/logger');

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 2525,
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });

    this.fromEmail = process.env.BREVO_FROM_EMAIL || 'kenakaye11@gmail.com';
    this.brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';
    this.queue = [];
    this.isProcessing = false;
    this.maxRetries = 3;

    // Start background queue processor
    this.processorInterval = setInterval(() => this.processQueue(), 60000); // Regular check every minute
    if (this.processorInterval.unref) this.processorInterval.unref();
  }

  /**
   * Add email to the queue for delivery
   */
  async enqueueEmail(to, subject, html, templateName = 'generic') {
    const job = {
      to,
      subject,
      html,
      templateName,
      retries: 0,
      createdAt: new Date(),
    };

    this.queue.push(job);
    logger.info(`Email job queued [${templateName}] for ${to}`);
    
    // Trigger immediate processing attempt
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  /**
   * Process the next job in the queue
   */
  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const currentJob = this.queue.shift();

      try {
        const mailOptions = {
          from: `"Shemsu" <${this.fromEmail}>`,
          to: currentJob.to,
          subject: currentJob.subject,
          html: currentJob.html,
        };

        const info = await this.transporter.sendMail(mailOptions);
        logger.info(`Email delivered: [${currentJob.templateName}] to ${currentJob.to} (ID: ${info.messageId})`);
      } catch (error) {
        currentJob.retries++;
        if (currentJob.retries < this.maxRetries) {
          logger.warn(`Email delivery failed (Retry ${currentJob.retries}/3): ${error.message}`);
          this.queue.push(currentJob);
        } else {
          logger.error(`Final email failure after ${this.maxRetries} attempts: [${currentJob.templateName}] to ${currentJob.to}. Error: ${error.message}`);
        }
      }
      
      // Small delay between sends
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    this.isProcessing = false;
  }

  /**
   * Template: User Verification
   */
  async sendVerificationEmail(to, code) {
    const html = `
      <div style="font-family: 'Inter', sans-serif; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px;">
        <h2 style="color: #2563eb; margin-bottom: 24px;">Verify Your Account</h2>
        <p style="font-size: 16px; line-height: 24px;">Welcome to Shemsu. Please use the verification code below to complete your registration:</p>
        <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 20px; text-align: center; margin: 32px 0;">
          <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0f172a;">${code}</span>
        </div>
        <p style="font-size: 14px; color: #64748b;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 40px 0;">
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">&copy; ${new Date().getFullYear()} Shemsu Platform. All rights reserved.</p>
      </div>
    `;
    await this.enqueueEmail(to, 'Verify your Shemsu account', html, 'verification');
  }

  /**
   * Template: Order Confirmation
   */
  async sendOrderConfirmation(to, orderData) {
    const html = `
      <div style="font-family: 'Inter', sans-serif; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px;">
        <h2 style="color: #059669; margin-bottom: 24px;">Order Confirmed!</h2>
        <p style="font-size: 16px; line-height: 24px;">Hello, thank you for your order. We've received your payment and are processing it.</p>
        <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 32px 0;">
          <p style="margin: 4px 0;"><strong>Order ID:</strong> ${orderData.id}</p>
          <p style="margin: 4px 0;"><strong>Total Amount:</strong> ${orderData.amount} ETB</p>
          <p style="margin: 4px 0;"><strong>Status:</strong> Processing</p>
        </div>
        <p style="font-size: 14px; color: #64748b;">You can track your order status in your dashboard.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 40px 0;">
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">&copy; ${new Date().getFullYear()} Shemsu Platform. All rights reserved.</p>
      </div>
    `;
    await this.enqueueEmail(to, `Order Confirmation - ${orderData.id}`, html, 'order_confirmation');
  }

  /**
   * Template: Contact Form Proxy
   */
  async sendContactFormInquiry(formData) {
    const html = `
      <div style="font-family: 'Inter', sans-serif; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px;">
        <h2 style="color: #475569; margin-bottom: 24px;">New Contact Inquiry</h2>
        <p style="font-size: 16px; line-height: 24px;">A new message has been submitted via the contact form:</p>
        <div style="background: #f8fafc; border-left: 4px solid #475569; padding: 20px; margin: 32px 0;">
          <p style="margin: 4px 0;"><strong>Name:</strong> ${formData.name}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${formData.email}</p>
          <p style="margin: 4px 0;"><strong>Subject:</strong> ${formData.subject}</p>
          <p style="margin: 16px 0; font-style: italic;">"${formData.message}"</p>
        </div>
        <p style="font-size: 14px; color: #64748b;">Reply directly to this email to contact the user.</p>
      </div>
    `;
    // Send to platform admin. Note: Free Resend can only send TO verified domains or the registered email.
    await this.enqueueEmail(this.fromEmail, `Inquiry: ${formData.subject}`, html, 'contact_form');
  }

  /**
   * Template: Password Reset
   */
  async sendPasswordResetEmail(to, resetLink) {
    const html = `
      <div style="font-family: 'Inter', sans-serif; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px;">
        <h2 style="color: #dc2626; margin-bottom: 24px;">Reset Your Password</h2>
        <p style="font-size: 16px; line-height: 24px;">We received a request to reset your password. Click the button below to proceed:</p>
        <div style="text-align: center; margin: 40px 0;">
          <a href="${resetLink}" style="background: #0f172a; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Reset Password</a>
        </div>
        <p style="font-size: 14px; color: #64748b;">This link will expire in 1 hour. If you did not request this, no further action is required.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 40px 0;">
      </div>
    `;
    await this.enqueueEmail(to, 'Reset your Shemsu password', html, 'password_reset');
  }

  /**
   * Fail-safe: Send email via Brevo HTTP API
   */
  async sendEmailViaApi(to, subject, html) {
    try {
      const response = await fetch(this.brevoApiUrl, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_SMTP_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'Shemsu', email: this.fromEmail },
          to: [{ email: to }],
          subject: subject,
          htmlContent: html
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API delivery failed');
      }

      logger.info(`Email delivered via HTTP API to ${to} (ID: ${data.messageId})`);
      return data;
    } catch (error) {
      logger.error(`Brevo API fallback failed: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new NotificationService();
