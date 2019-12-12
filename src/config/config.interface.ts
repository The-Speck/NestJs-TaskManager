import { DatabaseOptions } from '../database/database.interface';

export type TEnvironments = 'development' | 'production' | 'test';

export interface ConfigOptions extends DatabaseOptions {
  APP_ENV: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: number;
}
