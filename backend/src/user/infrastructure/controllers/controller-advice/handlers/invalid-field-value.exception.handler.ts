import { ExceptionHandler } from '../exception.handler';
import { Logger } from '@nestjs/common';
import { InvalidFieldValueException } from 'src/user/core/exceptions/invalid-field-value.exception';

export class InvalidFieldValueExceptionHandler extends ExceptionHandler<InvalidFieldValueException> {
  private readonly logger = new Logger(InvalidFieldValueExceptionHandler.name);

  constructor() {
    super();
  }
  public handle(
    exception: InvalidFieldValueException,
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
