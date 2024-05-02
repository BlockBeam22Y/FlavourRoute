import IAppointment from '../interfaces/IAppointment';
import AppointmentDto from '../dto/AppointmentDto';

const appointments: IAppointment[] = [];

let id: number = 1;

export default {
  async getAppointments(): Promise<IAppointment[]> {
    return appointments;
  },
  async getAppointmentById(id: number): Promise<IAppointment | null> {
    return appointments.find(appointment => appointment.id === id) ?? null;
  },
  async createAppointment(appointmentData: AppointmentDto): Promise<IAppointment> {
    const { date, time, userId } = appointmentData;

    const newAppointment: IAppointment = {
      id,
      date,
      time,
      userId,
      status: 'active'
    };

    appointments.push(newAppointment);
    id++;

    return newAppointment;
  },
  async cancelAppointment(id: number): Promise<void> {
    for (const appointment of appointments) {
      if (appointment.id === id) {
        appointment.status = 'cancelled';
        return;
      }
    }
  }
};