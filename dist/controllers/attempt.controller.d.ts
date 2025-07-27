import { AttemptService } from '../services/attempt.service';
import { CreateAttemptDto } from '../dtos/attempt.dto';
export declare class AttemptController {
    private readonly attemptService;
    constructor(attemptService: AttemptService);
    create(req: any, dto: CreateAttemptDto): Promise<import("../entities/attempt.entity").Attempt>;
    getMy(req: any): Promise<import("../entities/attempt.entity").Attempt[]>;
    getOne(req: any, quizId: string): Promise<{
        questions: import("../entities/question.entity").Question[];
        id: string;
        quiz: import("../entities/quiz.entity").Quiz;
        user: import("../entities/user.entity").User;
        answers: Record<string, any>;
        score: number;
        createdAt: Date;
    }>;
}
