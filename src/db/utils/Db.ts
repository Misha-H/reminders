import { tasks } from '~/db/schema/tasks';
import { DbBase } from '~/db/utils/DbBase';

export class Db {
  public static async getTasks() {
    return await DbBase.client.select().from(tasks);
  }
}
