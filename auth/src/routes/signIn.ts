import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../models/User';
import { authResponseHandler } from '../utils/utils';
import { JWT } from '../utils/customeCrypto';

const errors = require('../errors/errors');

const router = Router();

router.post(
  '',
  authResponseHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let user;

    User.authenticate({ email, password })
      .then((doc) => {
        user = doc;
        const accessToken = JWT.createAccessToken('user._id');
        const refreshToken = JWT.createRefreshToken('user._id');
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      })
      .catch((error) => {
        console.log(error);
      });
  },
);

export { router };
