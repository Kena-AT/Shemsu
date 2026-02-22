require('dotenv').config();
const { db, pool } = require('../config/db');
const { categories } = require('../models/schema');
const logger = require('../config/logger');

const categoryData = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Home & Garden', slug: 'home-garden' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Books', slug: 'books' },
  { name: 'Toys', slug: 'toys' },
  { name: 'Automotive', slug: 'automotive' },
];

async function seedCategories() {
  try {
    console.log('Seeding categories...');
    for (const cat of categoryData) {
      await db.insert(categories).values(cat).onConflictDoNothing();
    }
    console.log('Categories seeded successfully!');
    process.exit(0);
  } catch (err) {
    logger.error('Error seeding categories', err);
    process.exit(1);
  }
}

seedCategories();
