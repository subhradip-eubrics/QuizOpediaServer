import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
// import { nanoid } from 'nanoid';
import { User } from '../entities/user.entity';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async signup(email: string, password: string, role?: string) {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) throw new BadRequestException('Email already registered');

    const hash = await bcrypt.hash(password, 10);

    const { nanoid } = await import('nanoid');

    const user = this.userRepo.create({
      id: `usr-${nanoid()}`,
      email,
      password: hash,
      role: role || 'user',
    });

    await this.userRepo.save(user);

    return this.signToken(user);
  }

  async login(email: string, password: string) {
    console.log("Email: ", email, " Password: ", password);
    
    const user = await this.userRepo.findOne({ where: { email } });

    // const result = await this.userRepo.query("SELECT * FROM User");
    console.log(user);
    
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Wrong password');

    return this.signToken(user);
  }

  private signToken(user: User) {
    const payload = { id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }
}
