import { ExceptionHandler } from '../exception.handler';
import { Logger } from '@nestjs/common';
import { UnauthorizedException } from 'src/auth/core/exceptions/unuthorized.exceptions';

export class UnauthorizedExceptionHandler extends ExceptionHandler<UnauthorizedException> {
  private readonly logger = new Logger(UnauthorizedExceptionHandler.name);

  constructor() {
    super();
  }
  public handle(exception: UnauthorizedException, response, request): void {
    this.logger.error(exception.message);
    response.status(401).json({
      statusCode: 401,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
