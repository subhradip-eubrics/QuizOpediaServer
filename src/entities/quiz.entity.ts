import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Question } from './question.entity';
import { Attempt } from './attempt.entity';

@Entity('Quiz')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  topic: string;

  @Column('text', { array: true }) // Postgres array
  tags: string[];

  @Column({ default: 30 })
  timeLimit: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @OneToMany(() => Attempt, (attempt) => attempt.quiz)
  attempts: Attempt[];
}
