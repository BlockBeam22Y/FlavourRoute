import IUser from '../interfaces/IUser';
import UserDto from '../dto/UserDto';
import credentialsService from './credentialsService';

const users: IUser[] = [];

let id: number = 1;

export default {
  async getUsers(): Promise<IUser[]> {
    return users;
  },
  async getUserById(id: number): Promise<IUser | null> {
    return users.find(user => user.id === id) ?? null;
  },
  async createUser(userData: UserDto): Promise<IUser> {
    const { username, password, name, email, birthdate, nDni } = userData;

    const credentialsId = await credentialsService.createCredential(username, password);

    const newUser: IUser = {
      id,
      name,
      email,
      birthdate,
      nDni,
      credentialsId
    };

    users.push(newUser);
    id++;
    
    return newUser;
  }
};