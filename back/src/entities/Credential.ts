import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'credentials'
})
export class Credential {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({
    length: 50
  })
  username: string

  @Column({
    length: 16
  })
  password: string
}