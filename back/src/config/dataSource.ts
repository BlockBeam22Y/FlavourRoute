import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Appointment } from '../entities/Appointment';
import { Credential } from '../entities/Credential';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'njmsjmdct',
  database: 'test',
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [ User, Appointment, Credential ],
  subscribers: [],
  migrations: [],
});

export const userRepository = AppDataSource.getRepository(User);
export const appointmentRepository = AppDataSource.getRepository(Appointment);
export const credentialRepository = AppDataSource.getRepository(Credential);