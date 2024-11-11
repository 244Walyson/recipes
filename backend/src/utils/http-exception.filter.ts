import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ControllerAdvice } from 'src/user/infrastructure/controllers/controller-advice/controller.advice';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly controllerAdvice: ControllerAdvice) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    this.controllerAdvice.handle(exception, response, request);
  }
}
