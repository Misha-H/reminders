import { sql } from 'drizzle-orm';
import { integer, sqliteTable, blob } from 'drizzle-orm/sqlite-core';

import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

/**
 * TODO: Delete and restart dataabse so that this new table takes effect.
 */
export const timetables = sqliteTable('timetables', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  image: blob('image', { mode: 'buffer' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$type<number>()
    .default(sql`(unixepoch())`),
});

export type Timetable = InferSelectModel<typeof timetables>;

export type NewTimetable = InferInsertModel<typeof timetables>;
