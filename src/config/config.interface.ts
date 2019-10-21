import { IDatabaseOptions } from '../database/database.interface';

export type TEnvironments = 'development' | 'production' | 'test' | 'uat';

export interface IConfigOptions extends IDatabaseOptions {
  APP_ENV: string;
}
