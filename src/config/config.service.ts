import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import ConfigError from './config.error';
import { ConfigOptions, TEnvironments } from './config.interface';

export class ConfigService {
  public static readonly DEVELOPMENT: 'development' = 'development';

  private readonly INTEGER_SPECIFIER = '+';
  private readonly configOptions: ConfigOptions;
  private readonly logger = new Logger(ConfigService.name);

  constructor() {
    const environment: TEnvironments = this.getEnvironment();
    this.configOptions = this.getConfigOptions(environment);

    this.logger.log(`Starting server with ${environment} settings`);
  }

  public read(): ConfigOptions {
    return this.configOptions;
  }

  public isDev(): boolean {
    return this.configOptions.APP_ENV === 'development';
  }

  public isProd(): boolean {
    return this.configOptions.APP_ENV === 'production';
  }

  private getEnvironment(): TEnvironments {
    return (process.env.NODE_ENV as TEnvironments) || ConfigService.DEVELOPMENT;
  }

  private getConfigOptions(environment: TEnvironments): ConfigOptions {
    const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
    this.validateConfigOptions(data, environment);
    return data;
  }

  private validateConfigOptions(data: any, environment: TEnvironments): void {
    this.setEnv(data, environment);
    this.setInts(data);
  }

  private setEnv(data: any, environment: TEnvironments): void {
    data.APP_ENV = environment;
  }

  private setInts(data: any): void {
    for (const option in data) {
      if (data[option].startsWith(this.INTEGER_SPECIFIER)) {
        const value = Number(data[option].substring(1));
        this.validateNumber(option, value);

        data[option] = value;
      }
    }
  }

  private validateNumber(key: string, value: number): boolean {
    if (isNaN(value)) {
      throw new ConfigError(
        `Non-Integer config options should not start with '${
          this.INTEGER_SPECIFIER
        }'. The Following property is invalid ${key}`,
      );
    }
    return true;
  }
}
