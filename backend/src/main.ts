import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './utils/http-exception.filter';
import { ControllerAdvice } from './user/infrastructure/controllers/controller-advice/controller.advice';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter(new ControllerAdvice()));

  const config = new DocumentBuilder()
    .setTitle('Recipes')
    .setDescription('A simple API to manage and share recipes')
    .setVersion('1.0')
    .addTag('recipes')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
