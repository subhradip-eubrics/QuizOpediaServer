import { AiResponseDto } from "src/dtos/ai.dto";
import { AiService } from "src/services/ai.service";
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    aiFeedback(dto: AiResponseDto): Promise<string>;
}
