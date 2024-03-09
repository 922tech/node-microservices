import { validationResult } from 'express-validator';
import { BaseError } from '../errors/base';
import { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/errors';

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('/*/*/*/**//*');

  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({
      detail: true ? error.message : (error as BaseError).serializeError(),
    });
  }
  // Handle other types of errors
  return res.status(500).json({ message: 'Internal Server Error' });
}

export function versioningMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const version = req.headers['accept-version'];
  Object.defineProperty(req, 'version', { value: version, writable: false });
  next();
}

export function requestValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
}
