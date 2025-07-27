import { AiResponseDto } from 'src/dtos/ai.dto';
export declare function generateQuizFromAI(topic: string, numOfQn: number): Promise<any>;
export declare function aiFeedBack(data: AiResponseDto): Promise<string>;
