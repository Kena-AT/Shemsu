require('dotenv').config();

/** @type { import("drizzle-kit").Config } */
module.exports = {
  schema: "./src/models/schema.js",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};
