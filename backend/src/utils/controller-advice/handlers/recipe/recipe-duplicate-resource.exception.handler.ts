import { RecipeDomainException } from '@/src/recipe/core/exceptions/domain.exception';
import { ExceptionHandler } from '../../exception.handler';
import { Logger } from '@nestjs/common';

export class RecipeDuplicateresourceExcetionHandler extends ExceptionHandler<RecipeDomainException> {
  private readonly logger = new Logger(
    RecipeDuplicateresourceExcetionHandler.name,
  );

  constructor() {
    super();
  }
  public handle(exception: RecipeDomainException, response, request): void {
    this.logger.error(exception.message);
    response.status(400).json({
      statusCode: 400,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
