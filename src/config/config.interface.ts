import { DatabaseOptions } from '../database/database.interface';

export type TEnvironments = 'development' | 'production' | 'test';

export interface ConfigOptions extends DatabaseOptions {
  APP_ENV: string;
}
