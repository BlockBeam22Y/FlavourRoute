import { Appointment } from '../entities/Appointment';
import { User } from '../entities/User';
import { appointmentRepository } from '../config/dataSource';
import AppointmentDto from '../dto/AppointmentDto';
import usersService from './usersService';
import ErrorTypes from '../utils/errorTypes';

export default {
  async getAppointments(): Promise<Appointment[]> {
    const appointments: Appointment[] = await appointmentRepository.find({
      relations: {
        user: true
      }
    });

    return appointments;
  },
  async getAppointmentById(id: number): Promise<Appointment> {
    const foundAppointment = await appointmentRepository.findOne({
      where: { id },
      relations: {
        user: true
      }
    });

    if (!foundAppointment)
      throw ErrorTypes.APPOINTMENT_NOT_FOUND

    return foundAppointment;
  },
  async createAppointment(appointmentData: AppointmentDto): Promise<Appointment> {
    const { date, time, userId } = appointmentData;

    const user: User = await usersService.getUserById(userId);
    const newAppointment: Appointment = appointmentRepository.create({
      date,
      time,
      status: 'active',
      user
    });

    await appointmentRepository.save(newAppointment);
    return newAppointment;
  },
  async cancelAppointment(id: number): Promise<Appointment> {
    const appointmentToCancel = await appointmentRepository.findOne({
      where: { id },
      relations: {
        user: true
      }
    });

    if (!appointmentToCancel)
      throw ErrorTypes.APPOINTMENT_NOT_FOUND;

    if (appointmentToCancel.status === 'cancelled')
      throw ErrorTypes.APPOINTMENT_ALREADY_CANCELLED;

    appointmentToCancel.status = 'cancelled';
    
    await appointmentRepository.save(appointmentToCancel);
    return appointmentToCancel;
  }
};