import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../models/User';
import { authResponseHandler } from '../utils/utils';
import { JWT } from '../utils/customeCrypto';
import { AuthError } from '../errors/errors';
import { body } from 'express-validator';

const router = Router();

router.post(
  '',
  [body('refreshToken').isJWT()],
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;
    const freshToken = JWT.verifyAndRefresh(refreshToken);
    if (!freshToken) {
      next(new AuthError());
    } else {
      res.json({ accessToken: freshToken });
    }
  },
);

export { router };
