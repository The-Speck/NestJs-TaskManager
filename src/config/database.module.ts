import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

function DatabaseOrmModule(): DynamicModule {
  const config = new ConfigService().read();

  return TypeOrmModule.forRoot({
    type: config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
  });
}

@Module({
  imports: [ConfigModule, DatabaseOrmModule()],
})
export class DatabaseModule {}
