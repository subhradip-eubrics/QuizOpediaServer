import { Body, Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { AttemptService } from '../services/attempt.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateAttemptDto } from '../dtos/attempt.dto';

@UseGuards(JwtAuthGuard)
@Controller('attempt')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  // POST /attempt - Attempt a quiz
  @Post()
  async create(@Req() req, @Body() dto: CreateAttemptDto) {
    return this.attemptService.createAttempt(req.user.id, dto);
  }

  // GET /attempt/my - Fetch all attempts of logged-in user
  @Get('my')
  async getMy(@Req() req) {
    return this.attemptService.getMyAttempts(req.user.id);
  }

  // GET /attempt/my/:id - Fetch attempt for a specific quiz
  @Get('my/:id')
  async getOne(@Req() req, @Param('id') quizId: string) {
    return this.attemptService.getAttemptByQuiz(req.user.id, quizId);
  }
}
