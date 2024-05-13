import { AppDataSource } from '../config/dataSource';
import { Appointment } from '../entities/Appointment';
import CustomError from '../utils/customError';

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
  findAll: async function (): Promise<Appointment[]> {
    const appointments: Appointment[] = await this.find({
      relations: {
        user: true
      }
    });

    if (!appointments.length)
      throw new CustomError('APPOINTMENTS_NOT_FOUND');

    return appointments;
  },
  findById: async function (id: string | number): Promise<Appointment> {
    try {
      const foundAppointment = await this.findOneOrFail({
        where: { id: +id },
        relations: {
          user: true
        }
      });

      return foundAppointment;
    } catch {
      throw new CustomError('APPOINTMENT_ID_INVALID', { id });
    }
  },
  findByIdAndCancel: async function (id: string | number): Promise<Appointment> {
    const appointmentToCancel = await this.findById(id);

    if (appointmentToCancel.status === 'cancelled')
      throw new CustomError('APPOINTMENT_ALREADY_CANCELLED', { id })

    appointmentToCancel.status = 'cancelled';
    
    await this.save(appointmentToCancel);
    return appointmentToCancel;
  }
});

export default AppointmentRepository;