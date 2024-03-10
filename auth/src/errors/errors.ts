import { BaseError } from "./base";
import { ValidationError } from "express-validator";


export class BadRequest extends BaseError {
    statusCode = 400;

    constructor(public error: string){
        super(error);
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
    serializeError() {
        return { detail: this.error };
    }
}

export class RequestValidationError extends BadRequest {

    constructor(public errors: ValidationError[]) {
        super("Invalid request parameters!");

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() : any {
        return {detail: this.errors}
    }
}

export class Conflict extends BaseError {
    statusCode = 409;

    constructor(public error: string){
        super(error);
        Object.setPrototypeOf(this, Conflict.prototype);
    }
    serializeError() {
        return { detail: this.error };
    }
}

export class AuthError extends BaseError {
  statusCode = 401;

  constructor(){
      super('Credentials were not provided or valid.');
      Object.setPrototypeOf(this, Conflict.prototype);
  }
  serializeError() {
      return { detail: 'Credentials were not provided or valid.' };
  }
}