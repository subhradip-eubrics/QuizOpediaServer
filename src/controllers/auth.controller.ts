import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto, LoginUserDto } from 'src/dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password, body.role);
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body.email, body.password);
  }
}
