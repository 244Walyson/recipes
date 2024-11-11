import { Injectable } from '@nestjs/common';
import { ExceptionHandler } from './exception.handler';
import { DomainExceptionHandler } from './handlers/domain.exception.handler';

@Injectable()
export class ControllerAdvice {
  private readonly handlers: Map<string, ExceptionHandler<Error>>;

  constructor() {
    this.handlers = new Map();

    this.registryHandlers();
  }

  private registryHandlers(): void {
    this.handlers.set('DomainException', new DomainExceptionHandler());
  }

  public handle(exception: Error): void {
    const handler = this.handlers.get(exception.name);
    if (handler) {
      handler.handle(exception);
      return;
    }
    console.error('No handler found for exception: ', exception);
  }
}
