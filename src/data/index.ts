export interface Task {
  id: number;
  description: string;
  created_at: number;
  subtasks: Array<Subtask>;
}

export interface Subtask {
  id: number;
  description: string;
  created_at: number;
}

export type Data = Array<Task>;

export const data: Data = [
  {
    id: 0,
    description: 'This is task 0',
    created_at: new Date().getTime(),
    subtasks: [
      {
        id: 0,
        description: 'This is subtask 0 for task 0',
        created_at: new Date().getTime(),
      },
      {
        id: 1,
        description: 'This is subtask 1 for task 1',
        created_at: new Date().getTime(),
      },
      {
        id: 2,
        description: 'This is subtask 2 for task 2',
        created_at: new Date().getTime(),
      },
    ],
  },
  {
    id: 1,
    description: 'This is task 1',
    created_at: new Date().getTime(),
    subtasks: [
      {
        id: 0,
        description: 'This is subtask 0 for task 0',
        created_at: new Date().getTime(),
      },
      {
        id: 1,
        description: 'This is subtask 1 for task 1',
        created_at: new Date().getTime(),
      },
    ],
  },
  {
    id: 2,
    description: 'This is task 2',
    created_at: new Date().getTime(),
    subtasks: [],
  },
];
