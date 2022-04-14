import { NextFunction, Request, Response } from 'express';
import * as SearchService from '../services/search';
import { TokenData } from '../models/TokenData';

export const searchUser = (req: Request<unknown, any>, res: Response, next: NextFunction): void => {
  const user = req.user as TokenData;
  SearchService.searchUser(user.id, req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const searchDoctor = (
  req: Request<unknown, any>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  SearchService.searchDoctor(user.id, req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
