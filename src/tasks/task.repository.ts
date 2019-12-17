import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { taskErrorMessage } from './task-message.error';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private readonly logger = new Logger(TaskRepository.name);

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        taskErrorMessage(user, 'get tasks', 'Filters', filterDto),
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await task.save();
    } catch (error) {
      this.logger.error(
        taskErrorMessage(user, 'create a task', 'Task', createTaskDto),
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete task.user;
    return task;
  }
}
