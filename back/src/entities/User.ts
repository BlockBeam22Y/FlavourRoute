import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Appointment } from './Appointment';
import { Credential } from './Credential';

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50
  })
  name: string

  @Column({
    length: 320
  })
  email: string

  @Column('date')
  birthdate: string

  @Column('integer')
  nDni: number

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[]
  
  @OneToOne(() => Credential)
  @JoinColumn()
  credential: Credential
}