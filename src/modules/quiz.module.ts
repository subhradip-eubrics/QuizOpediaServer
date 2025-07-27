import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from '../controllers/quiz.controller';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';
import { Attempt } from '../entities/attempt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, Attempt])
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
