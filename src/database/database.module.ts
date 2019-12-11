import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
      const configOptions = configService.read();
      return {
        type: configOptions.DB_TYPE,
        host: configOptions.DB_HOST,
        port: configOptions.DB_PORT,
        username: configOptions.DB_USERNAME,
        password: configOptions.DB_PASSWORD,
        database: configOptions.DB_NAME,
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
