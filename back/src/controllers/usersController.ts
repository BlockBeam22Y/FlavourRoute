import { Request, Response } from 'express';
import usersService from '../services/usersService';
import credentialsService from '../services/credentialsService';
import catchAsync from '../utils/catchAsync';

export const getUsers = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const users = await usersService.getUsers();

  res.status(200).json(users);
});

export const getUserById = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);

  res.status(200).json(user);
});

export const registerUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { username, password, name, email, notificationsEnabled, birthdate, nDni } = req.body;
  const newUser = await usersService.createUser({
    username,
    password,
    name,
    email,
    birthdate,
    nDni,
    notificationsEnabled
  });
  
  res.status(201).json({
    message: 'User created successfully',
    user: newUser,
  });
});

export const loginUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const loginData = await credentialsService.validateCredential(username, password);
  
  res.status(200).json(loginData);
});