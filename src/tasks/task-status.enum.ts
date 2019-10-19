export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export function createTaskStatusArray(): string[] {
  return Object.values(TaskStatus).filter(k => typeof k === 'string');
}
