import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { tasks } from './tasks';

// TODO: Update date to generate timestamp
export const subtasks = sqliteTable('subtasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  task_id: integer('task_id').references(() => tasks.id),
  description: text('description', { mode: 'text', length: 1024 }),
  isCompleted: integer('is_completed', { mode: 'boolean' })
    .notNull()
    .default(false),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Subtask = typeof subtasks.$inferSelect;

export type NewSubtask = typeof subtasks.$inferInsert;
