// backend/src/main.ts

// ЭТИХ СТРОК НЕ ХВАТАЛО:
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ВКЛЮЧАЕМ CORS
  app.enableCors();

  await app.listen(3000);
}

// ЭТА СТРОКА ЗАПУСКАЕТ ВСЮ ФУНКЦИЮ
bootstrap();
