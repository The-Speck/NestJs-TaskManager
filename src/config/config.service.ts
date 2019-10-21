import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { IConfigOptions, TEnvironments } from './config.interface';

export class ConfigService {
  public static readonly DEVELOPMENT: 'development' = 'development';

  private readonly envConfig: IConfigOptions;
  private readonly logger = new Logger(ConfigService.name);

  constructor() {
    const environment: TEnvironments = this.getEnvironment();
    this.envConfig = this.getConfigOptions(environment);

    this.logger.log(`Starting server with ${environment} settings`);
  }

  public read(): IConfigOptions {
    return this.envConfig;
  }

  public isDev(): boolean {
    return this.envConfig.APP_ENV === 'development';
  }

  public isProd(): boolean {
    return this.envConfig.APP_ENV === 'production';
  }

  private getEnvironment(): TEnvironments {
    return (process.env.NODE_ENV as TEnvironments) || ConfigService.DEVELOPMENT;
  }

  private getConfigOptions(environment: TEnvironments): IConfigOptions {
    const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
    return this.populateConfigOptions(data, environment);
  }

  private populateConfigOptions(
    data: any,
    environment: TEnvironments,
  ): IConfigOptions {
    data.APP_ENV = environment;
    data.DB_PORT = parseInt(data.DB_PORT, 10);
    return data;
  }
}
