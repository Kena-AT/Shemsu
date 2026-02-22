require('dotenv').config();
const { db } = require('./src/config/db');
const { products } = require('./src/models/schema');
const { eq, and, sql } = require('drizzle-orm');

async function testConcurrency() {
  try {
    console.log('--- Concurrency Test Started ---');
    
    // 1. Get a product
    const [product] = await db.select().from(products).limit(1);
    if (!product) {
       console.log('No products found to test. Please create one first.');
       process.exit(0);
    }
    
    console.log(`Testing with product: ${product.name} (v${product.version})`);
    
    // 2. Simulate User A update
    const updateA = await db.update(products)
      .set({ name: 'User A Modified', version: sql`${products.version} + 1` })
      .where(and(eq(products.id, product.id), eq(products.version, product.version)))
      .returning();
      
    console.log('User A update successful:', updateA.length > 0);

    // 3. Simulate User B update (using the OLD version)
    const updateB = await db.update(products)
      .set({ name: 'User B Modified', version: sql`${products.version} + 1` })
      .where(and(eq(products.id, product.id), eq(products.version, product.version)))
      .returning();
      
    if (updateB.length === 0) {
      console.log('User B update BLOCKED (Correct behavior!)');
    } else {
      console.error('User B update SUCCEEDED (Failure - versioning leak!)');
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

testConcurrency();
