const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { eq, and } = require('drizzle-orm');
const { db } = require('../config/db');
const { users, sellerVerifications } = require('../models/schema');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/emailService');
const notificationService = require('../services/notificationService');
const logger = require('../config/logger');
const crypto = require('crypto');

// ... during class or exports
exports.submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    await notificationService.sendContactFormInquiry({ name, email, subject, message });
    res.status(200).json({ message: 'Inquiry submitted successfully. Our team will contact you soon.' });
  } catch (error) {
    logger.error(`Contact form error: ${error.message}`);
    next(error);
  }
};

// Utility: Generate Access and Refresh Tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role, email: user.email, fullName: user.fullName },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};

// Register
exports.register = async (req, res, next) => {
  try {
    let { email, password, fullName, role } = req.body;
    email = email.toLowerCase();

    // 1. Validate role (Buyer/Seller only)
    if (!['buyer', 'seller'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role selection' });
    }

    // 2. Check if user exists (Generic error to prevent enumeration)
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Registration failed. Please try again.' });
    }

    // 3. Hash password
    const hashedPassword = await argon2.hash(password);

    // 4. Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 5. Create user
    const [newUser] = await db.insert(users).values({
      email,
      password: hashedPassword,
      fullName,
      role,
      verificationCode,
      verificationCodeExpiresAt: expiresAt,
    }).returning();

    // 6. Send email
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      message: 'Registration successful. Please check your email for the verification code.',
      userId: newUser.id,
    });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    next(error);
  }
};

// Verify Email
exports.verifyEmail = async (req, res, next) => {
  try {
    let { email, code } = req.body;
    email = email.toLowerCase();

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
      return res.status(400).json({ message: 'Verification failed' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    // Check attempts limit
    if (user.verificationAttempts >= 3) {
      return res.status(400).json({ message: 'Too many failed attempts. Please request a new code.' });
    }

    // Check expiry
    if (new Date() > user.verificationCodeExpiresAt) {
      return res.status(400).json({ message: 'Verification code expired' });
    }

    if (user.verificationCode !== code) {
      // Increment attempts
      await db.update(users)
        .set({ verificationAttempts: user.verificationAttempts + 1 })
        .where(eq(users.id, user.id));
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Success
    await db.update(users)
      .set({ 
        isVerified: true, 
        verificationCode: null, 
        verificationCodeExpiresAt: null,
        verificationAttempts: 0 
      })
      .where(eq(users.id, user.id));

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    next(error);
  }
};

// Resend Verification Email
exports.resendVerification = async (req, res, next) => {
  try {
    let { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    email = email.toLowerCase();

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    // Generate new code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await db.update(users)
      .set({ 
        verificationCode,
        verificationCodeExpiresAt: expiresAt,
        verificationAttempts: 0 
      })
      .where(eq(users.id, user.id));

    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: 'Verification code resent successfully' });
  } catch (error) {
    logger.error(`Resend verification error: ${error.message}`);
    next(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const [user] = await db.select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      password: users.password,
      role: users.role,
      isVerified: users.isVerified,
      failedLoginAttempts: users.failedLoginAttempts,
      lastLoginAttemptAt: users.lastLoginAttemptAt,
      verificationStatus: sellerVerifications.status
    })
    .from(users)
    .leftJoin(sellerVerifications, eq(users.id, sellerVerifications.sellerId))
    .where(eq(users.email, email))
    .limit(1);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Restrict Admin login from user side (generic error to prevent enumeration)
    if (user.role === 'admin') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        verificationStatus: user.verificationStatus || 'none'
      },
    });
  } catch (error) {
    next(error);
  }
};

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase();
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    // Always return success to prevent enumeration
    if (!user) {
      return res.status(200).json({ message: 'If an account exists with that email, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = await argon2.hash(resetToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.update(users)
      .set({ resetTokenHash, resetTokenExpiresAt: expiresAt })
      .where(eq(users.id, user.id));

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;
    await sendPasswordResetEmail(email, resetLink);

    res.status(200).json({ message: 'If an account exists with that email, a reset link has been sent.' });
  } catch (error) {
    next(error);
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    let { email, token, newPassword } = req.body;
    email = email.toLowerCase();

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user || !user.resetTokenHash || new Date() > user.resetTokenExpiresAt) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const isTokenValid = await argon2.verify(user.resetTokenHash, token);
    if (!isTokenValid) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const newHashedPassword = await argon2.hash(newPassword);

    await db.update(users)
      .set({ 
        password: newHashedPassword, 
        resetTokenHash: null, 
        resetTokenExpiresAt: null 
      })
      .where(eq(users.id, user.id));

    res.status(200).json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    next(error);
  }
};

// Refresh Token
exports.refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const [user] = await db.select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      role: users.role,
      verificationStatus: sellerVerifications.status
    })
    .from(users)
    .leftJoin(sellerVerifications, eq(users.id, sellerVerifications.sellerId))
    .where(eq(users.id, decoded.id))
    .limit(1);

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const tokens = generateTokens(user);
    res.status(200).json({ accessToken: tokens.accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Get current user profile
exports.getMe = async (req, res, next) => {
  try {
    const [user] = await db.select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      role: users.role,
      verificationStatus: sellerVerifications.status
    })
    .from(users)
    .leftJoin(sellerVerifications, eq(users.id, sellerVerifications.sellerId))
    .where(eq(users.id, req.user.id))
    .limit(1);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        verificationStatus: user.verificationStatus || 'none'
      },
    });
  } catch (error) {
    next(error);
  }
};

// Test Brevo HTTP API
exports.testEmailApi = async (req, res, next) => {
  try {
    const { to } = req.body;
    if (!to) return res.status(400).json({ message: 'Recipient email is required' });

    await notificationService.sendEmailViaApi(
      to, 
      'Brevo API Test Message', 
      '<h1>Success!</h1><p>If you see this, your Brevo HTTP API integration is working perfectly from Render.</p>'
    );

    res.status(200).json({ message: `Test email sent via HTTP API to ${to}` });
  } catch (error) {
    logger.error(`Test email API error: ${error.message}`);
    res.status(500).json({ message: 'API delivery test failed', error: error.message });
  }
};
