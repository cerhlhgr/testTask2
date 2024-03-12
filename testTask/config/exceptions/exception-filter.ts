import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { InternalBusinessException } from './exception-types/internal-business.exception';
import { NotFoundBusinessException } from './exception-types/not-found-business.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (exception instanceof InternalBusinessException) {
      this.logger.error(exception.getResponse());
      const response = exception.getResponse();
      const statusCode = exception.getStatus();
      httpAdapter.reply(ctx.getResponse(), response, statusCode);
      return;
    }

    if (exception instanceof NotFoundBusinessException) {
      this.logger.error(exception.getResponse());
      const response = exception.getResponse();
      const statusCode = exception.getStatus();
      httpAdapter.reply(ctx.getResponse(), response, statusCode);
      return;
    }

    if (exception instanceof BadRequestException) {
      this.logger.error(JSON.stringify(exception));
      const response = exception.getResponse();

      httpAdapter.reply(ctx.getResponse(), response, HttpStatus.BAD_REQUEST);
      return;
    }

    this.logger.error(exception);
    httpAdapter.reply(
      ctx.getResponse(),
      {
        message: 'Внутренняя ошибка сервера',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
