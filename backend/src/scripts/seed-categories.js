require('dotenv').config({ path: '.env' });
const { db } = require('../config/db');
const { categories } = require('../models/schema');
const logger = require('../config/logger');

const categoryData = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Home & Garden', slug: 'home-garden' },
  { name: 'Beauty & Personal Care', slug: 'beauty-personal-care' },
  { name: 'Sports & Outdoors', slug: 'sports-outdoors' },
  { name: 'Books & Stationery', slug: 'books-stationery' }
];

async function seed() {
  try {
    console.log('Starting category seeding...');
    
    for (const cat of categoryData) {
      await db.insert(categories)
        .values(cat)
        .onConflictDoNothing();
      console.log(`Seeded category: ${cat.name}`);
    }
    
    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
