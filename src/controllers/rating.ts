import { NextFunction, Request, Response } from 'express';
import { TokenData } from '../models/TokenData';
import * as RatingService from '../services/rating';

export const create = (
  req: Request<{ userId: string }, unknown, { score: number }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  RatingService.update(user.id, req.params.userId, req.body.score)
    .then(() => res.sendStatus(204))
    .catch(next);
};

export const remove = (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  RatingService.remove(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
