import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../models/User';
import { authResponseHandler } from '../utils/utils';
import { JWT } from '../utils/customeCrypto';
import { AuthError } from '../errors/errors';

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
        if (!user) {
          new AuthError();
        } 
        const accessToken = JWT.createAccessToken(user.id);
        const refreshToken = JWT.createRefreshToken(user.id);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      })
      .catch((error) => {
        console.log(error);
      });
  },
);

export { router };
