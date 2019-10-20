import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface IDatabaseEnvVar {
  // Should be DatabaseType from typeorm but Typescript throws not assignable type error.
  DB_TYPE: any;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

export interface IConfigOptions extends IDatabaseEnvVar {
  APP_ENV: string;
}

export class ConfigService {
  public static readonly DEVELOPMENT: string = 'development';

  private readonly envConfig: IConfigOptions;
  private readonly logger = new Logger(ConfigService.name);

  constructor() {
    const environment = process.env.NODE_ENV || ConfigService.DEVELOPMENT;
    const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));

    data.APP_ENV = environment;
    data.DB_PORT = parseInt(data.DB_PORT, 10);

    this.envConfig = data;
    this.logger.log(`Starting server with ${environment} settings`);
  }

  read(): IConfigOptions {
    return this.envConfig;
  }

  isDev(): boolean {
    return this.envConfig.APP_ENV === 'development';
  }

  isProd(): boolean {
    return this.envConfig.APP_ENV === 'production';
  }
}
