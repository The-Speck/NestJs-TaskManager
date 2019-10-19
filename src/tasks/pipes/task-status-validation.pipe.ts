import { PipeTransform, BadRequestException } from '@nestjs/common';
import { createTaskStatusArray } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = createTaskStatusArray();

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.indexOf(status) !== -1;
  }
}
