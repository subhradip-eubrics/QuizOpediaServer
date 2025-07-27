import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Attempt } from './attempt.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Attempt, (attempt) => attempt.user)
  attempts: Attempt[];
}
