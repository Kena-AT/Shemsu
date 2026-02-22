const path = require('path');
const dotenv = require('dotenv');

// Load environment variables immediately
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const argon2 = require('argon2');
const { db } = require('../src/config/db');
const { users } = require('../src/models/schema');
const { eq } = require('drizzle-orm');

async function createAdmin() {
  const email = 'kenakaye11@gmail.com';
  const password = 'Kunta1011#';
  const fullName = 'Shemsu Super Admin';

  try {
    console.log(`Checking if admin user ${email} already exists...`);
    
    const [existingAdmin] = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingAdmin) {
      console.log('Admin user already exists. Updating role to admin and resetting status to active.');
      await db.update(users)
        .set({ 
          role: 'admin', 
          status: 'active',
          isVerified: true,
          isDeleted: false 
        })
        .where(eq(users.id, existingAdmin.id));
      console.log('Admin user updated successfully.');
    } else {
      console.log('Creating new admin user...');
      const hashedPassword = await argon2.hash(password);
      
      await db.insert(users).values({
        email,
        password: hashedPassword,
        fullName,
        role: 'admin',
        status: 'active',
        isVerified: true,
        isDeleted: false
      });
      console.log('Admin user created successfully.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();
