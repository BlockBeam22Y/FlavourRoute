import { AppDataSource } from '../config/dataSource';
import { Appointment } from '../entities/Appointment';
import CustomError from '../utils/customError';
import { User } from '../entities/User';

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
  findAll: async function (): Promise<Appointment[]> {
    const appointments: Appointment[] = await this.find({
      relations: {
        user: true
      },
      order: {
        date: 'ASC',
        time: 'ASC'
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
  },
  checkByDateTime: async function (date: string, time: string, user: User): Promise<void> {
    const foundAppointment = await this.findOneBy({
      date,
      time,
      user,
      status: 'active'
    });

    if (foundAppointment) {
      throw new CustomError('APPOINTMENT_DUPLICATED', { date, time });
    }
  }
});

export default AppointmentRepository;