import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    signup(email: string, password: string, role?: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    private signToken;
}
