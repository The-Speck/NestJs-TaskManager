import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './config/database.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, AuthModule, ConfigModule, DatabaseModule],
})
export class AppModule {}
