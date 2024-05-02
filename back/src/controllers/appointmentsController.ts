import { Request, Response } from 'express';
import appointmentsService from '../services/appointmentsService';

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  const appointments = await appointmentsService.getAppointments();

  res.status(200).json(appointments);
};

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const appointment = await appointmentsService.getAppointmentById(+id);

  res.status(200).json(appointment);
};

export const scheduleAppointment = async (req: Request, res: Response): Promise<void> => {
  const { date, time, userId } = req.body;
  await appointmentsService.createAppointment({
    date,
    time,
    userId
  });
  
  res.status(201).json({
    message: 'Appointment scheduled successfully'
  });
};

export const cancelAppointment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await appointmentsService.cancelAppointment(+id);

  res.status(200).json({
    message: 'Appointment cancelled successfully'
  });
};