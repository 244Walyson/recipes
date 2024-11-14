import { ExceptionHandler } from '../../exception.handler';
import { Logger } from '@nestjs/common';
import { RecipeResourceNotFoundException } from '@/src/recipe/core/exceptions/resource-not-found.exception';

export class RecipeResourceNotFoundExceptionHandler extends ExceptionHandler<RecipeResourceNotFoundException> {
  private readonly logger = new Logger(
    RecipeResourceNotFoundExceptionHandler.name,
  );

  constructor() {
    super();
  }
  public handle(
    exception: RecipeResourceNotFoundException,
    response,
    request,
  ): void {
    this.logger.error(exception.message);
    response.status(404).json({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
