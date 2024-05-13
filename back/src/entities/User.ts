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
    length: 320,
    unique: true
  })
  email: string

  @Column('date')
  birthdate: string

  @Column('integer')
  nDni: number

  @Column({
    default: false
  })
  notificationsEnabled: boolean

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[]
  
  @OneToOne(() => Credential, credential => credential.user)
  @JoinColumn()
  credential: Credential
}