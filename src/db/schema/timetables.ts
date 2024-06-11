import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

/**
 * Stores latest upload file only.
 * NOTE: This table should only ever contain a single row.
 */
export const timetables = sqliteTable('timetables', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  /** base64 encoding. */
  dataUri: text('data_uri', { mode: 'text' }),
  isPdf: integer('is_pdf', { mode: 'boolean' }),
});

// This is the only row ID in the table that should be interacted with
// This should always be 1
export const timetableId = 1;

export type Timetable = InferSelectModel<typeof timetables>;

export type NewTimetable = InferInsertModel<typeof timetables>;
