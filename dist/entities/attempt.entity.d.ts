import { Quiz } from './quiz.entity';
import { User } from './user.entity';
export declare class Attempt {
    id: string;
    quiz: Quiz;
    user: User;
    answers: Record<string, any>;
    score: number;
    createdAt: Date;
}
