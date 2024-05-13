import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';
import CredentialRepository from '../repositories/CredentialRepository';
import UserRepository from '../repositories/UserRepository';

const validateUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password, name, email, birthdate, nDni, notificationsEnabled } = req.body;

  const validationData = {
    username:
      typeof username === 'string' &&
      username !== '' &&
      /^\w+$/.test(username),
    password:
      typeof password === 'string' &&
      password.length >= 8 &&
      password.length <= 16,
    name:
      typeof name === 'string' &&
      name !== '',
    email:
      typeof email === 'string' &&
      email !== '' &&
      /^([a-z0-9][-_\.]?)*[a-z0-9]@([a-z][-\.]?)*[a-z]\.[a-z]{2,4}$/.test(email),
    birthdate:
      typeof birthdate === 'string' &&
      birthdate !== '' &&
      !isNaN(new Date(birthdate).valueOf()),
    nDni:
      typeof nDni === 'number' &&
      nDni >= 1e6 &&
      nDni < 1e10,
    notificationsEnabled:
      ['undefined', 'boolean'].includes(typeof notificationsEnabled)
  };

  if (Object.values(validationData).every(value => value)) {
    if (await CredentialRepository.checkByUsername(username))
      next(new CustomError('USERNAME_ALREADY_IN_USE', { username }));
    else if (await UserRepository.checkByEmail(email))
      next(new CustomError('EMAIL_ALREADY_IN_USE', { email }));
    else
      next();
  } else
    next(new CustomError('USER_DATA_INVALID', { validationData }));
};

export default validateUserData;