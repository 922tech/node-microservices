import crypto from 'crypto';
import { settings } from '../settings';
const jwt = require('jsonwebtoken');

export class Password {
  static hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string,
  ) {
    return Password.hashPassword(suppliedPassword) === storedPassword;
  }
}

export class JWT {

  public static createAccessToken(payload: Object) {
    return jwt.sign(
      {'data': JSON.stringify(payload)},
      settings.JWT.secretKey,
      { expiresIn: settings.JWT.accessTokenLife, algorithm: 'HS256' },
    );
  }

  public static createRefreshToken(payload: Object) {
    console.log(settings.JWT.refreshTokenLife,);
    
    return jwt.sign(
      {'data': JSON.stringify(payload)},
      settings.JWT.secretKey, 
      { expiresIn: settings.JWT.refreshTokenLife, algorithm: 'HS256' },
    );
  }

  public static verify(token: string) {
    return jwt.verify(token, settings.JWT.secretKey);
  }
}

