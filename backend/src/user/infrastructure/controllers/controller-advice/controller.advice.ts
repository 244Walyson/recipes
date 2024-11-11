import { Injectable } from '@nestjs/common';
import { ExceptionHandler } from './exception.handler';
import { DomainExceptionHandler } from './handlers/domain.exception.handler';
import { DuplicateresourceExcetionHandler } from './handlers/duplicate-resource.exception.handler';
import { InvalidFieldValueExceptionHandler } from './handlers/invalid-field-value.exception.handler';
import { ResourceNotFoundExceptionHandler } from './handlers/resource-not-found.exception.handler';

@Injectable()
export class ControllerAdvice {
  private readonly handlers: Map<string, ExceptionHandler<Error>>;

  constructor() {
    this.handlers = new Map();

    this.registryHandlers();
  }

  private registryHandlers(): void {
    this.handlers.set('DomainException', new DomainExceptionHandler());
    this.handlers.set(
      'InvalidFieldValueException',
      new InvalidFieldValueExceptionHandler(),
    );
    this.handlers.set(
      'ResourceNotFoundException',
      new ResourceNotFoundExceptionHandler(),
    );
    this.handlers.set(
      'DuplicateResourceException',
      new DuplicateresourceExcetionHandler(),
    );
  }

  public handle(exception: Error, response, request): void {
    const handler = this.handlers.get(exception.name);
    if (handler) {
      handler.handle(exception, response, request);
      return;
    }
    console.error('No handler found for exception: ', exception);
  }
}
