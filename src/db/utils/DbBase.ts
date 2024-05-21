import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import Database from 'tauri-plugin-sql-api';

import rawSql from '~/db/drizzle/0000_curious_pet_avengers.sql?raw';

export class DbBase {
  private static name: string = 'tasks.db';
  private static hasInitSchemaThisConnection: boolean = false;
  private static connection: Database | null = null;
  public static client = drizzle(
    async (sql, params, method) => {
      try {
        const connection = await this.getConnection();

        /**
         * Swap out placeholder types.
         * `select ? from ?` -> `select $1 from $2`.
         * @param rawQuery Raw SQL.
         */
        const swapPlaceholders = (rawQuery: string): string => {
          let index = 1;
          return rawQuery.replace(/\?/g, () => `$${index++}`);
        };

        const sqlWithSwappedPlaceholders = swapPlaceholders(sql);

        if (method === 'run') {
          const result = await connection.execute(
            sqlWithSwappedPlaceholders,
            params
          );
          return { rows: [result] };
        } else {
          const result = await connection.select<{ [key: string]: unknown }[]>(
            sqlWithSwappedPlaceholders,
            params
          );
          return { rows: result.map(Object.values) };
        }
      } catch (error: unknown) {
        console.error('Error from sqlite proxy server: ', error);
        return { rows: [] };
      }
    },
    { logger: true }
  );

  private static async getConnection(): Promise<Database> {
    try {
      if (!this.connection) {
        return await this.connect();
      }

      return this.connection;
    } catch (error) {
      throw new Error('cannot get connection to database.');
    }
  }

  private static async connect(): Promise<Database> {
    try {
      if (!this.connection) {
        this.connection = await Database.load(`sqlite:${this.name}`);
      }

      // Do initial stuff like adding initial schema to database
      if (!this.hasInitSchemaThisConnection) {
        // This will assume we either have all or none of the tables in the database
        const query = sql`
          select 1
          from sqlite_master
          where type = ${'table'}
          limit 1
        `;

        const result = await this.client.all(query);

        // If at least one table does exist
        if (result.length === 0) {
          const query = sql.raw(rawSql);
          await this.client.run(query);
          this.hasInitSchemaThisConnection = true;
        }
      }

      return this.connection;
    } catch (error) {
      throw new Error('Database unavailable.');
    }
  }
}
