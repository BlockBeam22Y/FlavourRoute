import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity({
  name: 'appointments'
})
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column('date')
  date: string

  @Column('time')
  time: string

  @Column()
  status: 'active' | 'cancelled'

  @ManyToOne(() => User, user => user.appointments)
  user: User
}