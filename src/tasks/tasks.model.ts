export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export function TaskStatuses(): string[] {
  return Object.values(TaskStatus).filter(k => typeof k === 'string');
}
