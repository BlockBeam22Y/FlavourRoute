import { Credential } from '../entities/Credential';
import { credentialRepository } from '../config/dataSource';
import ErrorTypes from '../utils/errorTypes';

export default {
  async createCredential(username: string, password: string): Promise<Credential> {
    const newCredential: Credential = credentialRepository.create({
      username,
      password
    });

    await credentialRepository.save(newCredential);
    return newCredential;
  },
  async validateCredential(username: string, password: string): Promise<number> {
    const foundCredential = await credentialRepository.findOneBy({
      username,
      password
    });

    if (!foundCredential)
      throw ErrorTypes.USERNAME_OR_PASSWORD_INVALID;

    return foundCredential.id;
  }
};