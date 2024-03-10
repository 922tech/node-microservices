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
      { data: JSON.stringify(payload), type: 'access' },
      settings.JWT.secretKey,
      {
        expiresIn: settings.JWT.accessTokenLife,
        algorithm: 'HS256',
      },
    );
  }

  public static verify(token: string): any {
    return jwt.verify(token, settings.JWT.secretKey);
  }

  public static createRefreshToken(payload: Object) {
    console.log(settings.JWT.refreshTokenLife);

    return jwt.sign(
      { data: JSON.stringify(payload), type: 'refresh' },
      settings.JWT.secretKey,
      {
        expiresIn: settings.JWT.refreshTokenLife,
        algorithm: 'HS256',
      },
    );
  }

  public static verifyAcess(token: string): string | undefined {
    try {
      const decoded = JWT.verify(token);
      if (decoded.type === 'access') {
        return JSON.parse(decoded.data);
      } else return decoded;
    } catch (JsonWebTokenError) {
      return undefined;
    }
  }

  public static verifyAndRefresh(token: string): string | undefined {
    let fresh;
    console.log(settings.JWT);

    const decoded = JWT.verify(token);
    if (decoded.type === 'refresh') {
      fresh = JWT.createAccessToken(decoded.id);
    }
    return fresh;
  }
}
