import { Quiz } from './quiz.entity';
export declare class Question {
    id: string;
    quiz: Quiz;
    text: string;
    options: string[];
    answer: string;
}
