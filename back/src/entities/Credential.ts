import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Entity({
  name: 'credentials'
})
export class Credential {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({
    length: 50,
    unique: true
  })
  username: string

  @Column({
    length: 16
  })
  password: string

  @OneToOne(() => User, user => user.credential)
  user: User
}