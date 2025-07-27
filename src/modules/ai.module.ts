import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AiController } from "src/controllers/ai.controller";
import { Attempt } from "src/entities/attempt.entity";
import { Question } from "src/entities/question.entity";
import { Quiz } from "src/entities/quiz.entity";
import { AiService } from "src/services/ai.service";


@Module({
    // imports: [TypeOrmModule.forFeature([Quiz, Question, Attempt])],
    controllers: [AiController],
    providers: [AiService],
    exports: [AiService],
})

export class AiModule {}