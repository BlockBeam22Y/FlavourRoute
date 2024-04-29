import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  res.send('Obtener todos los usuarios');
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  res.send('Obtener un usuario por su id');
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  res.send('Registrar un nuevo usuario');
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  res.send('Iniciar sesión de un usuario');
};