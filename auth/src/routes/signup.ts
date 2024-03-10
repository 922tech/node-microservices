import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../models/User';
import { authResponseHandler } from '../utils/utils';

const errors = require('../errors/errors');

const router = Router();

router.post(
  '',
  authResponseHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    User.createUser({ email, password })
      .then((success) => {
        res.status(201).json({ detail: 'user signed up successfully' });
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
