import { TaskStatus, TaskStatuses } from '../tasks.model';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn(TaskStatuses())
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
