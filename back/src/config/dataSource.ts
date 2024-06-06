import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Appointment } from '../entities/Appointment';
import { Credential } from '../entities/Credential';
import { HOST, PASSWORD, DB } from './envs';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: HOST,
  port: 5432,
  username: 'postgres',
  password: PASSWORD,
  database: DB,
  dropSchema: false,
  synchronize: true,
  logging: false,
  entities: [ User, Appointment, Credential ],
  subscribers: [],
  migrations: [],
});