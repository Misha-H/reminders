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

