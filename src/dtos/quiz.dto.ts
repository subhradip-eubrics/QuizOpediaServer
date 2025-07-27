import { IsString, IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionDto {
  @IsString()
  text: string;

  @IsArray()
  options: string[];

  @IsString()
  answer: string;
}

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsString()
  topic: string;

  @IsArray()
  tags: string[];

  @IsNumber()
  timePerQuestion: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

export class AiAssistDto {
  @IsString()
  topic: string;

  @IsNumber()
  numOfQn: number;
}
