import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  description: text('description', { mode: 'text', length: 1024 }).notNull(),
  isCompleted: integer('is_completed', { mode: 'boolean' })
    .notNull()
    .default(false),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$type<number>()
    .default(sql`(unixepoch())`),
});

export type Task = InferSelectModel<typeof tasks>;

export type NewTask = InferInsertModel<typeof tasks>;
