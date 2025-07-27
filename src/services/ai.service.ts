import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { aiFeedBack } from "src/ai/ai.helper";
import { AiResponseDto } from "src/dtos/ai.dto";
import { Attempt } from "src/entities/attempt.entity";
import { Question } from "src/entities/question.entity";
import { Quiz } from "src/entities/quiz.entity";
import { Repository } from "typeorm";


@Injectable()
export class AiService {
    constructor(
        // @InjectRepository(Quiz) private quizRepo: Repository<Quiz>,
        // @InjectRepository(Question) private questionRepo: Repository<Question>,
        // @InjectRepository(Attempt) private attemptRepo: Repository<Attempt>
    ) {}

    async generateAiResponse(data: AiResponseDto) {
        // const {
        //     question,
        //     userAnswer,
        //     correctAnswer,
        //     prompt
        // } = data;

        const result = await aiFeedBack(data);

        return result
    }
}