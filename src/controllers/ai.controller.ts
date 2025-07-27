import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AiResponseDto } from "src/dtos/ai.dto";
import { AiAssistDto } from "src/dtos/quiz.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { AiService } from "src/services/ai.service";



@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @UseGuards(JwtAuthGuard)
    @Post('explain')
    async aiFeedback(@Body() dto: AiResponseDto) {
        return this.aiService.generateAiResponse(dto);
    }
}