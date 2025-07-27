import { AiResponseDto } from "src/dtos/ai.dto";
export declare class AiService {
    constructor();
    generateAiResponse(data: AiResponseDto): Promise<string>;
}
