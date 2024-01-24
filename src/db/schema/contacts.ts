import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  description: text('description', { mode: 'text', length: 500 }),
  phone: text('phone', { mode: 'text', length: 10 }).unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$type<number>()
    .default(sql`(unixepoch())`),
});

export type Contact = InferSelectModel<typeof contacts>;

export type NewContact = InferInsertModel<typeof contacts>;
