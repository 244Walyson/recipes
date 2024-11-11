import { ExceptionHandler } from '../exception.handler';
import { Logger } from '@nestjs/common';
import { ResourceNotFoundException } from 'src/user/core/exceptions/resource-not-found.exception';

export class ResourceNotFoundExceptionHandler extends ExceptionHandler<ResourceNotFoundException> {
  private readonly logger = new Logger(ResourceNotFoundExceptionHandler.name);

  constructor() {
    super();
  }
  public handle(exception: ResourceNotFoundException, response, request): void {
    this.logger.error(exception.message);
    response.status(404).json({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
