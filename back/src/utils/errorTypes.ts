import IError from '../interfaces/IError';

const ErrorTypes: { [key: string]: IError } = {
  USER_NOT_FOUND: {
    message: 'User not found',
    statusCode: 404
  },
  APPOINTMENT_NOT_FOUND: {
    message: 'Appointment not found',
    statusCode: 404
  },
  APPOINTMENT_ALREADY_CANCELLED: {
    message: 'Appointment already cancelled',
    statusCode: 409
  },
  USERNAME_OR_PASSWORD_INVALID: {
    message: 'Invalid username or password',
    statusCode: 400,
  },
};

export default ErrorTypes;