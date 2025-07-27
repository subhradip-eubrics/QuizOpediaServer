import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Quiz } from './quiz.entity';
import { User } from './user.entity';

@Entity('Attempt')
export class Attempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.attempts, { onDelete: 'CASCADE' })
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.attempts, { onDelete: 'CASCADE' })
  user: User;

  @Column('jsonb') // Postgres JSONB
  answers: Record<string, any>;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;
}
