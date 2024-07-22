import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.TZ = '-03:00'; // hora de brasilia
  // validacao de dados do objeto
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // aceita req de um servidor diferente do backend
  await app.listen(4000);
}
bootstrap();
