// (global as any).crypto = require('crypto');            //Node 20+ don't need this
// (global as any).crypto.randomUUID = require('uuid').v4;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS (Nest uses Express internally, no need to import express)
  app.enableCors();

  // ✅ Global DTO validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Prefix all routes with /api
  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, '0.0.0.0');
  console.log(`✅ Server running on http://localhost:${PORT}`);
}
bootstrap();
