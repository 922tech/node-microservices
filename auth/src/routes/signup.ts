import { NextFunction, Request, Response, Router } from 'express';
import User from '../models/User';
import { body } from 'express-validator';
import { requestValidationMiddleware } from '../middlewares/middlewares';

const errors = require('../errors/errors');

const router = Router();

router.post(
  '',
  [
    body('email').isEmail().withMessage('Email must be provided'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password sohuld be longer than 8 characters.'),
  ],
  requestValidationMiddleware,

  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = new User({ email, password });
    user
      .save()
      .then((success) => {
        res.status(201).json({ detail: 'user signed up successfully' });
        console.log(success);
      })
      .catch((error) => {
        console.error(error.code === 11000);
        if (error.code === 11000) {
          next(new errors.Conflict('User with the same Email already exists!'));
        }
      });
  },
);

export { router };
