import { AppDataSource } from '../config/dataSource';
import { User } from '../entities/User';
import CustomError from '../utils/customError';

const UserRepository = AppDataSource.getRepository(User).extend({
  findById: async function (id: string | number): Promise<User> {
    try {
      const foundUser = await this.findOneOrFail({
        where: { id: +id },
        relations: {
          appointments: true
        }
      });
      
      return foundUser;
    } catch {
      throw new CustomError('USER_ID_INVALID', { id });
    }
  },
  checkById: async function (id: number): Promise<boolean> {
    const foundUser = await this.findOneBy({ id });

    return !!foundUser;
  },
  checkByEmail: async function (email: string): Promise<boolean> {
    const foundUser = await this.findOneBy({ email });

    return !!foundUser;
  }
});

export default UserRepository;