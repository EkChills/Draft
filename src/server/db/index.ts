import { serial, text, pgTableCreator } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'; 
import * as schema1 from './schema'
 
const connectionString = env.DATABASE_URL
const client = postgres(connectionString)
export const db = drizzle(client, {schema:{...schema1}});
 
const pgTable = pgTableCreator((name) => `project1_${name}`);

