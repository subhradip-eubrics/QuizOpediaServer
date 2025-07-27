import { AuthService } from '../services/auth.service';
import { CreateUserDto, LoginUserDto } from 'src/dtos/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: CreateUserDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    login(body: LoginUserDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
}
