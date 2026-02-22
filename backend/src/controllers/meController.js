const { db } = require('../config/db');
const { users } = require('../models/schema');
const { eq } = require('drizzle-orm');

exports.getMe = async (req, res) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, req.user.id),
      columns: {
        password: false,
        verificationCode: false,
        resetTokenHash: false,
      }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};
