const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend/.env') });
const { db } = require('./backend/src/config/db');
const { users, orders, orderItems } = require('./backend/src/models/schema');
const { eq } = require('drizzle-orm');

async function checkData() {
  try {
    const allUsers = await db.select().from(users);
    console.log('Total Users:', allUsers.length);
    const sellers = allUsers.filter(u => u.role === 'seller');
    console.log('Sellers:', sellers.length);
    sellers.forEach(s => console.log(`- ${s.fullName} (${s.id})`));

    const allOrders = await db.select().from(orders);
    console.log('Total Orders:', allOrders.length);
    const paidOrders = allOrders.filter(o => o.paymentStatus === 'paid');
    console.log('Paid Orders:', paidOrders.length);

    const items = await db.select().from(orderItems);
    console.log('Total Order Items:', items.length);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkData();
