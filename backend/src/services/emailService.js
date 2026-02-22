const nodemailer = require('nodemailer');
const logger = require('../config/logger');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Send verification email
 * @param {string} to - Recipient email
 * @param {string} code - 6-digit verification code
 */
const sendVerificationEmail = async (to, code) => {
  try {
    const mailOptions = {
      from: `"Shemsu" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: 'Verify your Shemsu account',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>Welcome to Shemsu!</h2>
          <p>Please use the following 6-digit code to verify your account:</p>
          <div style="font-size: 24px; font-weight: bold; background: #f4f4f4; padding: 10px; text-align: center; letter-spacing: 5px;">
            ${code}
          </div>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Verification email sent to ${to}`);
  } catch (error) {
    logger.error(`Error sending verification email: ${error.message}`);
    throw new Error('Failed to send verification email');
  }
};

/**
 * Send password reset email
 * @param {string} to - Recipient email
 * @param {string} resetLink - Full reset URL
 */
const sendPasswordResetEmail = async (to, resetLink) => {
  try {
    const mailOptions = {
      from: `"Shemsu" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: 'Reset your Shemsu password',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click the button below to continue:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent to ${to}`);
  } catch (error) {
    logger.error(`Error sending reset email: ${error.message}`);
    throw new Error('Failed to send reset email');
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
