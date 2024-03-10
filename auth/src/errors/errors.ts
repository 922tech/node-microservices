import { BaseError } from './base';
import { ValidationError } from 'express-validator';

export class BadRequest extends BaseError {
  statusCode = 400;

  constructor(public error: string) {
    super(error);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
  serializeError(): { detail: string } {
    return { detail: this.error };
  }
}

export class RequestValidationError extends BadRequest {
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters!');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError(): any {
    return { detail: this.errors };
  }
}

export class Conflict extends BaseError {
  statusCode = 409;

  constructor(public error: string) {
    super(error);
    Object.setPrototypeOf(this, Conflict.prototype);
  }
  serializeError(): { detail: string } {
    console.error(this.error);
    return { detail: this.error };
  }
}
