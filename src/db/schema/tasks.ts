import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

// TODO: Update date to generate timestamp
export const tasks = sqliteTable('tasks', {
  task_id: integer('task_id').primaryKey(),
  description: text('description', { mode: 'text', length: 510 }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(new Date()),
});

export type Task = typeof tasks.$inferSelect;

export type NewTask = typeof tasks.$inferInsert;
