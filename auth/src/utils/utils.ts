import { body } from "express-validator";
import { requestValidationMiddleware } from "../middlewares/middlewares";

export const authResponseHandler = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password sohuld be longer than 8 characters.'),
      requestValidationMiddleware,
]