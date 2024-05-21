import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

/**
 * Stores all uploaded files, leaving room to add functionality to revert to prevous image.
 */
export const timetables = sqliteTable('timetables', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  /** base64 encoding. */
  image: text('image', { mode: 'text' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$type<number>()
    .default(sql`(unixepoch())`),
});

export type Timetable = InferSelectModel<typeof timetables>;

export type NewTimetable = InferInsertModel<typeof timetables>;
