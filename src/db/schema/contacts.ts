import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

// TODO: Update date to generate timestamp
export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  description: text('description', { mode: 'text', length: 500 }),
  phone: text('phone', { mode: 'text', length: 10 }).unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Contact = typeof contacts.$inferSelect;

export type NewContact = typeof contacts.$inferInsert;
