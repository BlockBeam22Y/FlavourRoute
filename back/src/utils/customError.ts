const ErrorTypes = {
  USER_DATA_INVALID: {
    message: () => 'Invalid user data',
    statusCode: 400
  },
  USERNAME_ALREADY_IN_USE: {
    message: (params: any) => `Username '${params.username}' is already in use`,
    statusCode: 400
  },
  EMAIL_ALREADY_IN_USE: {
    message: (params: any) => `Email '${params.email}' is already in use`,
    statusCode: 400
  },
  USERNAME_OR_PASSWORD_INVALID: {
    message: () => 'Invalid username or password',
    statusCode: 400,
  },
  APPOINTMENT_DATA_INVALID: {
    message: () => 'Invalid appointment data',
    statusCode: 400
  },
  APPOINTMENT_USER_INVALID: {
    message: (params: any) => `Couldn't schedule appointment for user with id '${params.userId}'`,
    statusCode: 400
  },
  USER_ID_INVALID: {
    message: (params: any) => `Couldn't find user with id '${params.id}'`,
    statusCode: 404
  },
  APPOINTMENTS_NOT_FOUND: {
    message: () => 'No appointments were found',
    statusCode: 404
  },
  APPOINTMENT_ID_INVALID: {
    message: (params: any) => `Couldn't find appointment with id '${params.id}'`,
    statusCode: 404
  },
  APPOINTMENT_ALREADY_CANCELLED: {
    message: (params: any) => `Appointment with id '${params.id}' is already cancelled`,
    statusCode: 409
  },
  INTERNAL_SERVER_ERROR: {
    message: () => 'Internal server error',
    statusCode: 500,
  },
};

type ErrorCode = keyof (typeof ErrorTypes);

export default class CustomError {
  data: typeof ErrorTypes[ErrorCode]
  params: object

  constructor(code: ErrorCode = 'INTERNAL_SERVER_ERROR', params: object = {}) {
    this.data = ErrorTypes[code],
    this.params = params
  }
}