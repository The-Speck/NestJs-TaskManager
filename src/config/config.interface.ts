import { IDatabaseOptions } from '../database/database.interface';

export type TEnvironments = 'development' | 'production' | 'test';

export interface IConfigOptions extends IDatabaseOptions {
  APP_ENV: string;
}
