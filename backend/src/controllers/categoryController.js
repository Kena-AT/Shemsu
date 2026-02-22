const { categories } = require('../models/schema');
const { db } = require('../config/db');

exports.getCategories = async (req, res) => {
  try {
    const all = await db.query.categories.findMany();
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};
