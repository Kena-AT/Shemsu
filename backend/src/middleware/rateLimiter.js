const rateLimit = require('express-rate-limit');
const { db } = require('../config/db');
const { systemSettings } = require('../models/schema');
const { eq } = require('drizzle-orm');
const logger = require('../config/logger');

// Security Guardrails for Dynamic Configuration
const HARD_MIN = 10;   // Minimum 10 reqs/window
const HARD_MAX = 5000; // Maximum 5000 reqs/window
const DEFAULT_LIMIT = 100;

/**
 * Dynamically fetch API limit from system settings
 */
const getDynamicLimit = async () => {
  try {
    const [setting] = await db.select()
      .from(systemSettings)
      .where(eq(systemSettings.key, 'apiGlobalRequestLimit'))
      .limit(1);

    if (setting && setting.value) {
      const val = parseInt(setting.value);
      if (!isNaN(val)) {
        // Enforce hard bounds to prevent administrative misconfiguration
        return Math.min(Math.max(val, HARD_MIN), HARD_MAX);
      }
    }
  } catch (error) {
    logger.error(`RateLimiter dynamic fetch error: ${error.message}`);
  }
  return DEFAULT_LIMIT;
};

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: async (req, res) => {
    return await getDynamicLimit();
  },
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  skip: (req) => {
    // Skip for health checks
    if (req.path === '/health') return true;
    // Skip if internal bypass header is present (for k6)
    if (req.headers['x-stress-test'] === 'true') return true;
    // Skip in test environment
    if (process.env.NODE_ENV === 'test') return true;
    return false;
  },
});

module.exports = rateLimiter;
