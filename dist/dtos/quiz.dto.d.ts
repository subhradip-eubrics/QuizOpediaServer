export declare class QuestionDto {
    text: string;
    options: string[];
    answer: string;
}
export declare class CreateQuizDto {
    title: string;
    topic: string;
    tags: string[];
    timePerQuestion: number;
    questions: QuestionDto[];
}
export declare class AiAssistDto {
    topic: string;
    numOfQn: number;
}
