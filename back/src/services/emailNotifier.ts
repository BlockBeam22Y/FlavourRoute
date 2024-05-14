import { MAIL_USERNAME } from '../config/envs'
import { transporter } from '../config/mailTransporter'
import { User } from '../entities/User';
import formatDate from '../utils/formatDate';

export default {
  userRegisteredNotify(user: User, username: string): void {
    transporter.sendMail({
      from: MAIL_USERNAME,
      to: user.email,
      subject: 'User Created',
      text: `Welcome to Flavour Route! You have successfully registered as ${username}`
    }).catch(err => console.error(err));
  },
  apppointmentScheduledNotify(user: User, date: string, time: string): void {
    transporter.sendMail({
      from: MAIL_USERNAME,
      to: user.email,
      subject: `New Reservation`,
      text: `You have made a reservation for ${formatDate(date)} at ${time}`
    }).catch(err => console.error(err));
  },
  apppointmentCancelledNotify(user: User, date: string, time: string): void {
    transporter.sendMail({
      from: MAIL_USERNAME,
      to: user.email,
      subject: `Reservation Cancelled`,
      text: `You have cancelled a reservation for ${formatDate(date)} at ${time}`
    }).catch(err => console.error(err));
  }
};