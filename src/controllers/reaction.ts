import { NextFunction, Request, Response } from 'express';
import * as ReactionService from '../services/reaction';
import { TokenData } from '../models/request/TokenData';

export const create = (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReactionService.create(user.id, req.params.postId)
    .then(() => res.sendStatus(204))
    .catch(next);
};

export const remove = (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReactionService.remove(user.id, req.params.postId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
