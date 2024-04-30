import { eq, sql } from 'drizzle-orm';

import { contacts } from '~/db/schema/contacts';
import { tasks } from '~/db/schema/tasks';
import { subtasks } from '~/db/schema/subtasks';
import { DbBase } from '~/db/utils/DbBase';

import type { NewContact, Contact } from '~/db/schema/contacts';
import type { NewTask, Task } from '~/db/schema/tasks';
import type { NewSubtask, Subtask } from '~/db/schema/subtasks';

// TODO: Update db `tasks` table to allow the correct fields. (currently missing fields).

export class Db {
  public static async getTasks() {
    return await DbBase.client.select().from(tasks);
  }

  public static async createTask(values: NewTask) {
    return await DbBase.client.insert(tasks).values(values);
  }

  public static async deleteTask(id: Task['id']) {
    await DbBase.client.delete(tasks).where(eq(tasks.id, id));
  }

  public static async updateTask(values: Partial<Task>) {
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

  public static async updateSubtask(id: Subtask['id'], values: Partial<Subtask>) {
    return await DbBase.client.update(subtasks).set(values).where(eq(subtasks.id, id));
  }

  public static async getContacts() {
    return await DbBase.client.select().from(contacts);
  }

  public static async createContact(values: NewContact) {
    return await DbBase.client.insert(contacts).values(values);
  }

  public static async deleteContact(id: Contact['id']) {
    return await DbBase.client.delete(contacts).where(eq(contacts.id, id));
  }

  public static async updateContact(values: Partial<Contact>) {
    return await DbBase.client.update(contacts).set(values);
  }

  public static async doesContactPhoneExist(phone: Contact['phone']) {
    const result = await DbBase.client
      .select({ count: sql<boolean>`count(1)`.mapWith(Boolean) })
      .from(contacts)
      .where(eq(contacts.phone, phone));

    if (Array.isArray(result) && result.length === 1) {
      return result[0].count;
    }

    throw new Error('Unexpected result from database at `doesContactPhoneExist`.');
  }
}
