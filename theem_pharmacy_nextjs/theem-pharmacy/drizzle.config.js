require('dotenv/config');
const { config } = require('dotenv');
const path = require('path');

// Load environment variables from multiple sources
config({ path: path.resolve(__dirname, '.env') });
config({ path: path.resolve(__dirname, '.env.local') });

const { defineConfig } = require('drizzle-kit');

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

module.exports = defineConfig({
  schema: './lib/db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5432/theem_pharmacy_db',
  },
  verbose: true,
  strict: true,
});
