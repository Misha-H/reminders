import { eq } from 'drizzle-orm';

import { tasks } from '~/db/schema/tasks';
import { subtasks } from '~/db/schema/subtasks';
import { DbBase } from '~/db/utils/DbBase';

import type { NewTask, Task } from '~/db/schema/tasks';
import type { NewSubtask, Subtask } from '~/db/schema/subtasks';

export class Db {
  public static async getTasks() {
    return await DbBase.client.select().from(tasks);
  }

  public static async createTask(values: NewTask) {
    return await DbBase.client.insert(tasks).values(values);
  }

  public static async deleteTask(id: Task['id']) {
    return await DbBase.client.delete(tasks).where(eq(tasks.id, id));
  }

  public static async updateTask(values: NewTask) {
    return await DbBase.client.update(tasks).set(values);
  }

  public static async getSubtasks(taskId: Task['id']) {
    return await DbBase.client.select().from(subtasks).where(eq(subtasks.taskId, taskId));
  }

  public static async createSubtask(values: NewSubtask) {
    return await DbBase.client.insert(subtasks).values(values);
  }

  public static async deleteSubtask(id: Subtask['id']) {
    return await DbBase.client.delete(subtasks).where(eq(subtasks.id, id));
  }

  public static async updateSubtask(values: NewSubtask) {
    return await DbBase.client.update(subtasks).set(values);
  }
}
