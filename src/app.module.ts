// import { Module } from '@nestjs/common';
// import { AuthModule } from './modules/auth.module';
// // import { QuizModule } from './modules/quiz.module';
// // import { AttemptModule } from './modules/attempt.module';
// // import { AiModule } from './modules/ai.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
// import { ConfigModule } from '@nestjs/config';
// import { envConfig } from './config/env.config';

// @Module({
//   imports: [
//     ConfigModule.forRoot(envConfig),
//     TypeOrmModule.forRootAsync(typeOrmConfig),
//     AuthModule,     // ✅ /api/auth/*
//     // QuizModule,     // ✅ /api/quiz/*
//     // AttemptModule,  // ✅ /api/attempt/*
//     // AiModule,       // ✅ /api/ai/*
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// import { User } from './entities/user.entity';
// import { Quiz } from './entities/quiz.entity';
// import { Question } from './entities/question.entity';
// import { Attempt } from './entities/attempt.entity';
import { AuthModule } from './modules/auth.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Async TypeORM setup so it reads .env AFTER ConfigModule is ready
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     type: 'postgres',
    //     url: config.get<string>('DB_URL'),
    //     entities: [User, Quiz, Question, Attempt],
    //     synchronize: true,
    //     ssl: { rejectUnauthorized: false }, // ✅ for NeonDB
    //   }),
    // }),

    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),

    AuthModule,
  ],
})
export class AppModule {}
