import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';
import { Attempt } from '../entities/attempt.entity';
import { AiAssistDto, CreateQuizDto } from 'src/dtos/quiz.dto';
export declare class QuizService {
    private quizRepo;
    private questionRepo;
    private attemptRepo;
    constructor(quizRepo: Repository<Quiz>, questionRepo: Repository<Question>, attemptRepo: Repository<Attempt>);
    createQuiz(data: CreateQuizDto): Promise<Quiz>;
    getAllQuizzes(): Promise<Quiz[]>;
    getQuizById(id: string): Promise<Quiz>;
    deleteQuiz(id: string): Promise<import("typeorm").DeleteResult>;
    updateQuiz(id: string, data: any): Promise<Quiz>;
    aiGenerateQuiz(dto: AiAssistDto): Promise<any>;
}
