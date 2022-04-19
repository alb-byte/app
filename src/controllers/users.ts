import { NextFunction, Request, Response } from 'express';
import * as UsersService from '../services/users';
import { TokenData } from '../models/TokenData';
import { PageDto } from '../dto';

export const getUnApprovedUsers = (
  req: Request<unknown, unknown, unknown, PageDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  UsersService.getUnApprovedUsers(user.id, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const approveUser = (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  UsersService.approveUser(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const blockUser = (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  UsersService.blockUser(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
