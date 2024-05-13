import { Router } from 'express';
import { getAppointments, getAppointmentById, scheduleAppointment, cancelAppointment } from '../controllers/appointmentsController';
import validateAppointmentData from '../middlewares/validateAppointmentData';

const appointmentsRouter: Router = Router();

appointmentsRouter.get('/', getAppointments);
appointmentsRouter.get('/:id', getAppointmentById);
appointmentsRouter.post('/schedule', validateAppointmentData, scheduleAppointment);
appointmentsRouter.put('/cancel/:id', cancelAppointment);

export default appointmentsRouter;