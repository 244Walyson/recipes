import { DomainException } from 'src/user/core/exceptions/domain.exception';
import { ExceptionHandler } from '../exception.handler';
import { Logger } from '@nestjs/common';

export class DomainExceptionHandler extends ExceptionHandler<DomainException> {
  private readonly logger = new Logger(DomainExceptionHandler.name);

  constructor() {
    super();
  }
  public handle(exception: DomainException, response, request): void {
    this.logger.error(exception.message);
    response.status(400).json({
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
