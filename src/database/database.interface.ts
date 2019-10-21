export interface IDatabaseEnvVar {
  // Should be DatabaseType from typeorm but Typescript throws not assignable type error.
  DB_TYPE: any;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}
