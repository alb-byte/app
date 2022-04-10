import { NextFunction, Request, Response } from 'express';
import * as RelationService from '../services/relation';
import { TokenData } from '../models/request/TokenData';
import { PageDto, UserIdDto } from '../newLib/dto';

export const getFriends = (
  req: Request<unknown, unknown, unknown, PageDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  RelationService.getFriends(user.id, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const addFriend = (req: Request<UserIdDto>, res: Response, next: NextFunction): void => {
  const user = req.user as TokenData;

  RelationService.addFriend(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const deleteFriend = (req: Request<UserIdDto>, res: Response, next: NextFunction): void => {
  const user = req.user as TokenData;

  RelationService.deleteFriend(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};

export const getSubscribers = (
  req: Request<unknown, unknown, unknown, PageDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  RelationService.getSubscribers(user.id, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getSubscriptions = (
  req: Request<unknown, unknown, unknown, PageDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  RelationService.getSubscriptions(user.id, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const addSubscription = (
  req: Request<UserIdDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;

  RelationService.addSubscription(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const deleteSubscription = (
  req: Request<UserIdDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;

  RelationService.deleteSubscription(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
