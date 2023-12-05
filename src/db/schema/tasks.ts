import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  task_id: integer('task_id').primaryKey(),
  description: text('description', { mode: 'text', length: 510 }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Task = typeof tasks.$inferSelect;

export type NewTask = typeof tasks.$inferInsert;
