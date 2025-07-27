import { Repository } from 'typeorm';
import { Attempt } from '../entities/attempt.entity';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';
import { CreateAttemptDto } from '../dtos/attempt.dto';
export declare class AttemptService {
    private attemptRepo;
    private quizRepo;
    private questionRepo;
    constructor(attemptRepo: Repository<Attempt>, quizRepo: Repository<Quiz>, questionRepo: Repository<Question>);
    createAttempt(userId: string, dto: CreateAttemptDto): Promise<Attempt>;
    getMyAttempts(userId: string): Promise<Attempt[]>;
    getAttemptByQuiz(userId: string, quizId: string): Promise<{
        questions: Question[];
        id: string;
        quiz: Quiz;
        user: import("../entities/user.entity").User;
        answers: Record<string, any>;
        score: number;
        createdAt: Date;
    }>;
}
