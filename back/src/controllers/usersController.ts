import { Request, Response } from 'express';
import usersService from '../services/usersService';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await usersService.getUsers();

  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await usersService.getUserById(+id);

  res.status(200).json(user);
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, name, email, birthdate, nDni } = req.body;
  await usersService.createUser({
    username,
    password,
    name,
    email,
    birthdate,
    nDni
  });
  
  res.status(201).json({
    message: 'User created successfully'
  });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  res.send('Iniciar sesión de un usuario');
};