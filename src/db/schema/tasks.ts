import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title', { mode: 'text', length: 512 }).notNull(),
  description: text('description', { mode: 'text', length: 1024 }).notNull(),
  backgroundColor: text('background_color', { mode: 'text', length: 12 }).notNull(),
  markWeight: integer('mark_weight', { mode: 'number' }).notNull(),
  /** Stored as `'2020-01-31'` */
  date: text('date', { mode: 'text' }).notNull(),
  isCompleted: integer('is_completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$type<number>()
    .default(sql`(unixepoch())`),
});

export type Task = InferSelectModel<typeof tasks>;

export type NewTask = InferInsertModel<typeof tasks>;
