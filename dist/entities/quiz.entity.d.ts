import { Question } from './question.entity';
import { Attempt } from './attempt.entity';
export declare class Quiz {
    id: string;
    title: string;
    topic: string;
    tags: string[];
    timeLimit: number;
    createdAt: Date;
    questions: Question[];
    attempts: Attempt[];
}
