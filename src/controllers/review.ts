import { NextFunction, Request, Response } from 'express';
import * as ReviewService from '../services/review';
import { TokenData } from '../models/request/TokenData';

export const getMany = (
  req: Request<{ userId: string }, unknown, unknown, { page: number }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReviewService.getManyReview(user.id, req.params.userId, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getOne = (
  req: Request<{ userId: string; reviewId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReviewService.getOneReview(user.id, req.params.userId, req.params.reviewId)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const create = (
  req: Request<{ userId: string }, unknown, { body: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReviewService.addReview(user.id, req.params.userId, req.body.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const update = (
  req: Request<{ userId: string; reviewId: string }, unknown, { body: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReviewService.updateReview(user.id, req.params.reviewId, req.body.body)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const remove = (
  req: Request<{ userId: string; reviewId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReviewService.removeReview(user.id, req.params.reviewId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
