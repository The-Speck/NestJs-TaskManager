import { IDatabaseEnvVar } from '../database/database.interface';

export interface IConfigOptions extends IDatabaseEnvVar {
  APP_ENV: string;
}
