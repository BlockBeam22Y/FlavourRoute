import { AppDataSource } from '../config/dataSource';
import { Credential } from '../entities/Credential';
import CustomError from '../utils/customError';

const CredentialRepository = AppDataSource.getRepository(Credential).extend({
  login: async function (username: string, password: string): Promise<Credential> {
    try {
      const foundCredential = await this.findOneOrFail({
        where: {
          username,
          password
        },
        relations: {
          user: {
            appointments: true
          }
        },
      });

      return foundCredential;
    } catch {
      throw new CustomError('USERNAME_OR_PASSWORD_INVALID', { login: false });
    }
  },
  checkByUsername: async function (username: string): Promise<boolean> {
    const foundCredential = await this.findOneBy({ username });

    return !!foundCredential;
  }
});

export default CredentialRepository;