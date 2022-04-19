import { NextFunction, Request, Response } from 'express';
import * as RelationService from '../services/relation';
import { TokenData } from '../models/TokenData';
import { PageDto } from '../dto';

export const getManyFriends = (
  req: Request<unknown, unknown, unknown, PageDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  RelationService.getManyFriends(user.id, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const addFriend = (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;

  RelationService.addFriend(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const deleteFriend = (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;

  RelationService.removeFriend(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};

export const getManySubscribers = (
  req: Request<unknown, unknown, unknown, PageDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  RelationService.getManySubscribers(user.id, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getManySubscriptions = (
  req: Request<unknown, unknown, unknown, PageDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  RelationService.getManySubscriptions(user.id, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const createSubscription = (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;

  RelationService.addSubscription(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const removeSubscription = (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;

  RelationService.removeSubscription(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
