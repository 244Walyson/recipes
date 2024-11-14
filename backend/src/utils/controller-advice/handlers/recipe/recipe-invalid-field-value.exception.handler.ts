import { ExceptionHandler } from '../../exception.handler';
import { Logger } from '@nestjs/common';
import { RecipeInvalidFieldValueException } from '@/src/recipe/core/exceptions/invalid-field-value.exception';

export class RecipeInvalidFieldValueExceptionHandler extends ExceptionHandler<RecipeInvalidFieldValueException> {
  private readonly logger = new Logger(
    RecipeInvalidFieldValueExceptionHandler.name,
  );

  constructor() {
    super();
  }
  public handle(
    exception: RecipeInvalidFieldValueException,
    response,
    request,
  ): void {
    this.logger.error(exception.message);
    response.status(422).json({
      statusCode: 422,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
