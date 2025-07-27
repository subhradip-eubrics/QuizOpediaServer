import { QuizService } from '../services/quiz.service';
import { CreateQuizDto, AiAssistDto } from '../dtos/quiz.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    createQuiz(dto: CreateQuizDto): Promise<import("../entities/quiz.entity").Quiz>;
    aiAssist(dto: AiAssistDto): Promise<any>;
    deleteQuiz(id: string): Promise<{
        message: string;
    }>;
    getAll(): Promise<import("../entities/quiz.entity").Quiz[]>;
    getOne(id: string): Promise<import("../entities/quiz.entity").Quiz>;
    updateQuiz(id: string, dto: CreateQuizDto): Promise<import("../entities/quiz.entity").Quiz>;
}
