import Database from 'tauri-plugin-sql-api';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/sqlite-proxy';

class DbBase {
  private static name: string = 'events.db';
  private static connection: Database | null = null;
  public static client = drizzle(async (sql, params, method) => {
    try {
      return { rows: [] };
    } catch (error: any) {
      console.error('Error from sqlite proxy server: ', error);
      return { rows: [] };
    }
  });

  private static async getConnection(): Database {
    if (!this.connection) {
      throw new Error('Database not accessible.');
    }

    return this.connection;
  }

  private static async connect(): Promise<void> {
    try {
      this.connection = await Database.load(`sqlite:${this.name}`);
    } catch (error) {
      throw new Error('Database unavailable.');
    }
  }

  private static async init(): Promise<void> {
    try {
      await this.connect();

      const query = sql`
        SELECT
          1
        FROM
          sqlite_master
        WHERE
          type = ${'table'}
        LIMIT
          1
      `;

      // TODO: Add client call
    } catch (error) {
      throw new Error('Cannot initialise database.');
    }
  }

  constructor() {
    DbBase.init();
  }
}
