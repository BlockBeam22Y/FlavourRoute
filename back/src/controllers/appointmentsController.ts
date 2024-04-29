import { Request, Response } from 'express';

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  res.send('Obtener todos los turnos');
};

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  res.send('Obtener un turno por su id');
};

export const scheduleAppointment = async (req: Request, res: Response): Promise<void> => {
  res.send('Agendar un nuevo turno');
};

export const cancelAppointment = async (req: Request, res: Response): Promise<void> => {
  res.send('Cancelar un turno existente');
};