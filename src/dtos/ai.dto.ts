import { IsNotEmpty, IsString} from 'class-validator'

export class AiResponseDto {
    @IsString()
    @IsNotEmpty()
    question: string;

    @IsString()
    @IsNotEmpty()
    userAnswer: string;
    
    @IsString()
    @IsNotEmpty()
    correctAnswer: string;

    @IsString()
    @IsNotEmpty()
    prompt: string;
}