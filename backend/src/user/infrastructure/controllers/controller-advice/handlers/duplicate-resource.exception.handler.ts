import { DuplicateresourceException } from 'src/user/core/exceptions/duplicate-resource.exception';
import { ExceptionHandler } from '../exception.handler';
import { Logger } from '@nestjs/common';

export class DuplicateresourceExcetionHandler extends ExceptionHandler<DuplicateresourceException> {
  private readonly logger = new Logger(DuplicateresourceExcetionHandler.name);

  constructor() {
    super();
  }
  public handle(
    exception: DuplicateresourceException,
    response,
    request,
  ): void {
    this.logger.error(exception.message);
    response.status(400).json({
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
