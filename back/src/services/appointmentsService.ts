import { Appointment } from '../entities/Appointment';
import { User } from '../entities/User';
import AppointmentRepository from '../repositories/AppointmentRepository';
import UserRepository from '../repositories/UserRepository';
import AppointmentDto from '../dto/AppointmentDto';
import emailNotifier from './emailNotifier';

export default {
  async getAppointments(): Promise<Appointment[]> {
    return AppointmentRepository.findAll();
  },
  async getAppointmentById(id: string): Promise<Appointment> {
    return AppointmentRepository.findById(id);
  },
  async createAppointment(appointmentData: AppointmentDto): Promise<Appointment> {
    const { date, time, purpose, userId } = appointmentData;

    const user: User = await UserRepository.findById(userId);

    await AppointmentRepository.checkByDateTime(date, time, user);

    const newAppointment: Appointment = AppointmentRepository.create({
      date,
      time,
      purpose,
      user
    });

    await AppointmentRepository.save(newAppointment);

    if (user.notificationsEnabled) {
      emailNotifier.apppointmentScheduledNotify(user, date, time, purpose);
    }

    return newAppointment;
  },
  async cancelAppointment(id: string): Promise<Appointment> {
    const appointment: Appointment = await AppointmentRepository.findByIdAndCancel(id);
    const { user, date, time, purpose } = appointment;

    if (user.notificationsEnabled) {
      emailNotifier.apppointmentCancelledNotify(user, date, time, purpose);
    }

    return appointment;
  }
};