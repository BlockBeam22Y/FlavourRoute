import { Appointment } from '../entities/Appointment';
import { User } from '../entities/User';
import AppointmentRepository from '../repositories/AppointmentRepository';
import UserRepository from '../repositories/UserRepository';
import AppointmentDto from '../dto/AppointmentDto';

export default {
  async getAppointments(): Promise<Appointment[]> {
    return AppointmentRepository.findAll();
  },
  async getAppointmentById(id: string): Promise<Appointment> {
    return AppointmentRepository.findById(id);
  },
  async createAppointment(appointmentData: AppointmentDto): Promise<Appointment> {
    const { date, time, userId } = appointmentData;

    const user: User = await UserRepository.findById(userId);
    const newAppointment: Appointment = AppointmentRepository.create({
      date,
      time,
      status: 'active',
      user
    });

    await AppointmentRepository.save(newAppointment);
    return newAppointment;
  },
  async cancelAppointment(id: string): Promise<Appointment> {
    return AppointmentRepository.findByIdAndCancel(id);
  }
};