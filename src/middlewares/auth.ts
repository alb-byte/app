import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../libs/config';
import { AuthenticationError, AuthorizationError } from '../exception/httpError';
import createHttpError from 'http-errors';
import { UserType } from '../enums';
import { TokenData } from '../models/TokenData';
export default {
  authFilter: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authorization = req.headers.authorization;
      const bearer = authorization && authorization.startsWith('Bearer ') ? authorization : null;
      const token = bearer ? bearer.split('Bearer ')[1] : null;
      if (token) {
        const tokenData = (await jwt.verify(token, config.auth.accessTokenSecret)) as TokenData;
        req.user = Object.freeze({
          id: tokenData.id,
          userType: tokenData.userType,
        });
        next();
      } else throw new AuthenticationError('Invalid token');
    } catch (e: any) {
      next(e);
    }
  },
  doctorFilter: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user as TokenData;

    if (!(user.userType === UserType.DOCTOR)) next(createHttpError(403, 'User is not a doctor'));
    else next();
  },
  pacientFilter: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user as TokenData;

    if (!(user.userType === UserType.PACIENT)) next(createHttpError(403, 'User is not a pacient'));
    else next();
  },
  adminFilter: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user as TokenData;

    if (!(user.userType === UserType.ADMIN)) next(createHttpError(403, 'User is not a admin'));
    else next();
  },
};
