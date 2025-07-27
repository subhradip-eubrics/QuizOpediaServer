import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class CreateAttemptDto {
  @IsString()
  @IsNotEmpty()
  quizId: string;

  @IsObject()
  @IsNotEmpty()
  answers: Record<string, string>;  // { questionId: "selectedOption" }
}
