import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './utils/http-exception.filter';
import { ControllerAdvice } from './user/infrastructure/controllers/controller-advice/controller.advice';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter(new ControllerAdvice()));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
