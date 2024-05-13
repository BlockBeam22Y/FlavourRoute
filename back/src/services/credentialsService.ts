import { Credential } from '../entities/Credential';
import CredentialRepository from '../repositories/CredentialRepository';

export default {
  async createCredential(username: string, password: string): Promise<Credential> {
    const newCredential: Credential = CredentialRepository.create({
      username,
      password
    });

    await CredentialRepository.save(newCredential);
    return newCredential;
  },
  async validateCredential(username: string, password: string) {
    const credential: Credential = await CredentialRepository.login(username, password);

    return {
      login: true,
      user: credential.user
    };
  }
};