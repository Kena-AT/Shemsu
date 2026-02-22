const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const logger = require('./logger');

const schema = require('../models/schema');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle database client', err);
});

const db = drizzle(pool, { schema });

module.exports = { db, pool };

