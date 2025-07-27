import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';
import { Attempt } from '../entities/attempt.entity';
import { nanoid } from 'nanoid';
import { generateQuizFromAI } from 'src/ai/ai.helper';
import { AiAssistDto, CreateQuizDto } from 'src/dtos/quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepo: Repository<Quiz>,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    @InjectRepository(Attempt) private attemptRepo: Repository<Attempt>,
  ) {}

  async createQuiz(data: CreateQuizDto) {
    const { title, topic, tags, questions, timePerQuestion } = data;

    const quiz = this.quizRepo.create({
      id: `qz-${nanoid()}`,
      title,
      topic,
      tags,
      timeLimit: timePerQuestion,
      questions: questions.map((q) =>
        this.questionRepo.create({
          id: `qn-${nanoid()}`,
          text: q.text,
          options: q.options,
          answer: q.answer,
        }),
      ),
    });
    console.log(quiz);
    console.log("Saved Quiz");
    const result = await this.quizRepo.save(quiz);


    console.log(result);
    
    
    return result;
  }

  async getAllQuizzes() {
    return this.quizRepo.find({ relations: ['questions'] });
  }

  async getQuizById(id: string) {
    const quiz = await this.quizRepo.findOne({
      where: { id },
      relations: ['questions'],
    });

    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async deleteQuiz(id: string) {
    await this.questionRepo.delete({ quiz: { id } });
    await this.attemptRepo.delete({ quiz: { id } });
    return await this.quizRepo.delete(id);
  }

  async updateQuiz(id: string, data: any) {
    const { title, topic, tags, questions } = data;

    // Delete old questions
    await this.questionRepo.delete({ quiz: { id } });

    const quiz = await this.quizRepo.findOneBy({ id });
    if (!quiz) throw new NotFoundException('Quiz not found');

    quiz.title = title;
    quiz.topic = topic;
    quiz.tags = tags;

    quiz.questions = questions.map((q) =>
      this.questionRepo.create({
        id: `qn-${nanoid()}`,
        text: q.text,
        options: q.options,
        answer: q.answer,
      }),
    );

    return await this.quizRepo.save(quiz);
  }

  async aiGenerateQuiz(dto: AiAssistDto) {
    const result = await generateQuizFromAI(dto.topic, dto.numOfQn);
    console.log("Ai: ");
    console.log(result);
    
    
    return result;
  }
}