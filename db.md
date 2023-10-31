# Storage options

| Database Options                                | Type      | Performance | Setup Difficulty | Codeability | Offline | File System | Browser | Desktop | Mobile |
| ----------------------------------------------- | --------- | ----------- | ---------------- | ----------- | ------- | ----------- | ------- | ------- | ------ |
| `IndexedDB`                                     | NoSQL     | 3           | 5                | 4           | Yes     | No          | Yes     | Yes     | No     |
| `localStorage`                                  | Key/Value | 4           | 4                | 5           | Yes     | No          | Yes     | Yes     | No     |
| SQLite                                          | SQL       | 1           | 2                | 2           | Yes     | Yes         | No      | Yes     | Yes    |
| File System (JSON)                              | NoSQL     | 5           | 1                | 1           | Yes     | Yes         | No      | Yes     | Yes    |
| Hosted Document Database Server (MongoDB Atlas) | Document  | 2           | 3                | 3           | No      | No          | Yes     | Yes     | Yes    |

SQLite 1 2 2 = 5

File System (JSON) 5 1 1 = 7

Hosted Document Database Server (MongoDB Atlas) 2 3 3 = 8

- [Drizzle ORM](https://orm.drizzle.team/docs/)
- [Sequelize](https://sequelize.org/docs/v7/)




NEXT LESSON, SET UP DATABASE