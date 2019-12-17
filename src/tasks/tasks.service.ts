import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { taskErrorMessage } from './task-message.error';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException('Task was not found');
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;

    try {
      return task.save();
    } catch (error) {
      this.logger.error(
        taskErrorMessage(user, 'update a task', 'Task', task),
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async deleteTask(id: number, user: User): Promise<void> {
    let result;

    try {
      result = await this.taskRepository.delete({ id, userId: user.id });
    } catch (error) {
      this.logger.error(
        taskErrorMessage(user, 'delete a task', 'Task Id', id),
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    if (result.affected === 0) {
      throw new NotFoundException('Task was not found');
    }
  }
}
