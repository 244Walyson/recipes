import { RecipeDomainException } from '@/src/recipe/core/exceptions/domain.exception';
import { ExceptionHandler } from '../../exception.handler';
import { Logger } from '@nestjs/common';

export class RecipeDomainExceptionHandler extends ExceptionHandler<RecipeDomainException> {
  private readonly logger = new Logger(RecipeDomainExceptionHandler.name);

  constructor() {
    super();
  }
  public handle(exception: RecipeDomainException, response, request): void {
    this.logger.error(exception.message);
    response.status(400).json({
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
