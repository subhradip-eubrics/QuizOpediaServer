// typeorm.config.ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';
import { Attempt } from '../entities/attempt.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    type: 'postgres',
    url: config.get<string>('DB_URL'),
    entities: [User, Quiz, Question, Attempt],
    synchronize: false,
    ssl: { rejectUnauthorized: false },
  }),
};
