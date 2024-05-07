import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { tasks } from './tasks';

import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// TODO: Update date to generate timestamp
export const subtasks = sqliteTable('subtasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  taskId: integer('task_id')
    .references(() => tasks.id, { onDelete: 'cascade' })
    .notNull(),
  description: text('description', { mode: 'text', length: 1024 }).notNull(),
  isCompleted: integer('is_completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$type<number>()
    .default(sql`(unixepoch())`),
});

export type Subtask = InferSelectModel<typeof subtasks>;

export type NewSubtask = InferInsertModel<typeof subtasks>;
