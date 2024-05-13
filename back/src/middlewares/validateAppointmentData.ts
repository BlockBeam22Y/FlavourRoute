import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';
import UserRepository from '../repositories/UserRepository';

const validateAppointmentData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { date, time, userId } = req.body;

  const validationData = {
    date:
      typeof date === 'string' &&
      date !== '',
    time:
      typeof time === 'string' &&
      time !== '' &&
      !isNaN(new Date(`${date} ${time}`).valueOf()),
    userId:
      typeof userId === 'number' &&
      userId > 0
  };

  if (Object.values(validationData).every(value => value)) {
    const isValidUser = await UserRepository.checkById(userId);

    if (isValidUser)
      next();
    else
      next(new CustomError('APPOINTMENT_USER_INVALID', { userId }))
  } else
    next(new CustomError('APPOINTMENT_DATA_INVALID', { validationData }));
};

export default validateAppointmentData;