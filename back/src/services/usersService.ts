import { User } from '../entities/User';
import { Credential } from '../entities/Credential';
import UserRepository from '../repositories/UserRepository';
import UserDto from '../dto/UserDto';
import credentialsService from './credentialsService';
import emailNotifier from './emailNotifier';

export default {
  async getUsers(): Promise<User[]> {
    const users: User[] = await UserRepository.find({
      relations: {
        appointments: true
      }
    });

    return users;
  },
  async getUserById(id: string): Promise<User> {
    return UserRepository.findById(id);
  },
  async createUser(userData: UserDto): Promise<User> {
    const { username, password, name, email, birthdate, nDni, notificationsEnabled } = userData;

    const credential: Credential = await credentialsService.createCredential(username, password);
    const newUser: User = UserRepository.create({
      name,
      email,
      birthdate,
      nDni,
      notificationsEnabled,
      credential
    });

    await UserRepository.save(newUser);

    if (notificationsEnabled) {
      emailNotifier.userRegisteredNotify(newUser, username);
    }

    return newUser;
  }
};