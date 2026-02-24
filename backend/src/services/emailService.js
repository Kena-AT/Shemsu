const notificationService = require('./notificationService');

/**
 * Send verification email (Bridged to notificationService)
 * @param {string} to - Recipient email
 * @param {string} code - 6-digit verification code
 */
const sendVerificationEmail = async (to, code) => {
  await notificationService.sendVerificationEmail(to, code);
};

/**
 * Send password reset email (Bridged to notificationService)
 * @param {string} to - Recipient email
 * @param {string} resetLink - Full reset URL
 */
const sendPasswordResetEmail = async (to, resetLink) => {
  await notificationService.sendPasswordResetEmail(to, resetLink);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
