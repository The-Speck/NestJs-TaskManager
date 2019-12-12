import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
      const {
        DB_TYPE,
        DB_HOST,
        DB_NAME,
        DB_PASSWORD,
        DB_PORT,
        DB_USERNAME,
      } = configService.read();
      return {
        type: DB_TYPE,
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
      };
    },
  });
}

@Module({
  imports: [DatabaseOrmModule()],
})
export class DatabaseModule {}
