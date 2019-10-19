import { TaskStatus, createTaskStatusArray } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn(createTaskStatusArray())
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
