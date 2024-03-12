import { ValidatorOptions } from 'class-validator';

export class ValidationPipeConfig implements ValidatorOptions {
  whitelist: true;
  validationError: {
    target: true;
    value: true;
  };
}
