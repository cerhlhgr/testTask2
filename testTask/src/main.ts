import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ValidationPipeConfig } from '../config/validation/validation-pipe.config';
import { ConfigService } from '../config/config.service';
import { AllExceptionsFilter } from '../config/exceptions/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get<HttpAdapterHost>(HttpAdapterHost);
  const logger = app.get<Logger>(Logger);
  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe(new ValidationPipeConfig()));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));
  const appPort = configService.get<number>('PORT');
  await app.listen(appPort);
  logger.log(`App start on port: ${appPort}`);
}

bootstrap();
