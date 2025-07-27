import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttemptController } from '../controllers/attempt.controller';
import { AttemptService } from '../services/attempt.service';
import { Attempt } from '../entities/attempt.entity';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt, Quiz, Question])],
  controllers: [AttemptController],
  providers: [AttemptService],
  exports: [AttemptService],
})
export class AttemptModule {}
