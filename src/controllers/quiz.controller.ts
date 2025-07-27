import { Body, Controller, Get, Post, Delete, Put, Param, UseGuards } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto, AiAssistDto } from '../dtos/quiz.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/role.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async createQuiz(@Body() dto: CreateQuizDto) {
    return this.quizService.createQuiz(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('ai-assist')
  async aiAssist(@Body() dto: AiAssistDto) {
    return this.quizService.aiGenerateQuiz(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteQuiz(@Param('id') id: string) {
    await this.quizService.deleteQuiz(id);
    return { message: 'Quiz deleted successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll() {
    return this.quizService.getAllQuizzes();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateQuiz(@Param('id') id: string, @Body() dto: CreateQuizDto) {
    return this.quizService.updateQuiz(id, dto);
  }
}
