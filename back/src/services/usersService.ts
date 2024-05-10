import { User } from '../entities/User';
import { Credential } from '../entities/Credential';
import { userRepository } from '../config/dataSource';
import UserDto from '../dto/UserDto';
import credentialsService from './credentialsService';
import ErrorTypes from '../utils/errorTypes';

export default {
  async getUsers(): Promise<User[]> {
    const users: User[] = await userRepository.find({
      relations: {
        appointments: true
      }
    });

    return users;
  },
  async getUserById(id: number): Promise<User> {
    const foundUser = await userRepository.findOne({
      where: { id },
      relations: {
        appointments: true
      }
    });
    
    if (!foundUser)
      throw ErrorTypes.USER_NOT_FOUND;

    return foundUser;
  },
  async createUser(userData: UserDto): Promise<User> {
    const { username, password, name, email, birthdate, nDni } = userData;

    const credential: Credential = await credentialsService.createCredential(username, password);
    const newUser: User = userRepository.create({
      name,
      email,
      birthdate,
      nDni,
      credential
    });

    await userRepository.save(newUser);
    return newUser;
  }
};