import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './utils/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ControllerAdvice } from './utils/controller-advice/controller.advice';

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
