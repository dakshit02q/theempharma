import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Connection pooling limits to prevent memory exhaustion
// max: 10 connections, prepare: false avoids prepared statement cache bloat
const client = postgres(process.env.DATABASE_URL, {
  max: 10,
  prepare: false,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });
