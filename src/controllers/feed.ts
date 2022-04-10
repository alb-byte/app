import { NextFunction, Request, Response } from 'express';
import { TokenData } from '../models/TokenData';
import * as FeedService from '../services/feed';

export const getMany = (
  req: Request<unknown, unknown, unknown, { page: number }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;

  FeedService.getMany(user.id, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
