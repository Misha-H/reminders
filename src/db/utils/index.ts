import { drizzle } from 'drizzle-orm/sqlite-proxy';
import Database from 'tauri-plugin-sql-api';

// // sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
// const db = await Database.load("sqlite:test.db");
// // mysql
// const db = await Database.load("mysql://user:pass@host/database");
// // postgres
// const db = await Database.load("postgres://postgres:password@localhost/test");

// await db.execute("INSERT INTO ...");

// INSERT and UPDATE examples for sqlite
// const result = await db.execute(
//   "INSERT into todos (id, title, status) VALUES ($1, $2, $3)",
//   [todos.id, todos.title, todos.status],
// );

// const result = await db.execute(
//   "UPDATE todos SET title = $1, completed = $2 WHERE id = $3",
//   [todos.title, todos.status, todos.id],
// );

class Db {
  private static name: string = '';
  private static connection: Database | null = null;
  public static client = drizzle(async (sql, params, method) => {
    try {
      // const rows = await axios.post('http://localhost:3000/query', { sql, params, method });

      return { rows: [] };
    } catch (error: any) {
      console.error('Error from sqlite proxy server: ', error);
      return { rows: [] };
    }
  });

  private static async connect() {
    this.connection = await Database.load(`sqlite:${this.name}`);
  }
}

// Usage
// const db = new Db('test.db');






