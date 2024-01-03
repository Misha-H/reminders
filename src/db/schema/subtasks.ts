import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { tasks } from './tasks';

// TODO: Update date to generate timestamp
export const subtasks = sqliteTable('subtasks', {
  subtask_id: integer('subtask_id').primaryKey(),
  task_id: integer('task_id').references(() => tasks.task_id),
  description: text('description', { mode: 'text', length: 255 }),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(new Date()),
});

export type Subtask = typeof subtasks.$inferSelect;

export type NewSubtask = typeof subtasks.$inferInsert;
