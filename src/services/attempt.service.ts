import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attempt } from '../entities/attempt.entity';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';
import { nanoid } from 'nanoid';
import { CreateAttemptDto } from '../dtos/attempt.dto';

@Injectable()
export class AttemptService {
  constructor(
    @InjectRepository(Attempt) private attemptRepo: Repository<Attempt>,
    @InjectRepository(Quiz) private quizRepo: Repository<Quiz>,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
  ) {}

  async createAttempt(userId: string, dto: CreateAttemptDto) {
    const { quizId, answers } = dto;

    // Check if user already attempted
    const existing = await this.attemptRepo.findOne({ where: { quiz: { id: quizId }, user: { id: userId } } });
    if (existing) {
      throw new ForbiddenException('Quiz already attempted');
    }

    // Fetch quiz with questions
    const quiz = await this.quizRepo.findOne({ where: { id: quizId }, relations: ['questions'] });
    if (!quiz) throw new NotFoundException('Quiz not found');

    // Score calculation
    let score = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] && answers[q.id] === q.answer) {
        score++;
      }
    });

    // Save attempt
    const attempt = this.attemptRepo.create({
      id: `atp-${nanoid()}`,
      quiz,
      user: { id: userId } as any,  // using partial user ref
      answers,
      score,
    });

    return await this.attemptRepo.save(attempt);
  }

  async getMyAttempts(userId: string) {
    const attempts = await this.attemptRepo.find({
        where: { user: {id: userId}},
        relations: ['quiz'],
    });

    console.log(attempts);
    
    return attempts;
  }

  async getAttemptByQuiz(userId: string, quizId: string) {
    const attempt = await this.attemptRepo.findOne({
      where: { quiz: { id: quizId }, user: { id: userId } },
      relations: ['quiz'],
    });

    if (!attempt) throw new NotFoundException('Attempt not found');

    const questions = await this.questionRepo.find({ where: { quiz: { id: quizId } } });
    return { ...attempt, questions };
  }
}
