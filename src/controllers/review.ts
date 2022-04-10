import { NextFunction, Request, Response } from 'express';
import * as ReviewService from '../services/review';
import { TokenData } from '../models/TokenData';
import { PageDto, ReviewBodyDto, ReviewParamsDto } from '../dto';

export const getMany = (
  req: Request<{ userId: string }, unknown, unknown, PageDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReviewService.getManyReview(user.id, req.params.userId, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getOne = (req: Request<ReviewParamsDto>, res: Response, next: NextFunction): void => {
  const user = req.user as TokenData;
  ReviewService.getOneReview(user.id, req.params.userId, req.params.reviewId)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const create = (
  req: Request<{ userId: string }, unknown, ReviewBodyDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReviewService.addReview(user.id, req.params.userId, req.body.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const update = (
  req: Request<ReviewParamsDto, unknown, ReviewBodyDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReviewService.updateReview(user.id, req.params.reviewId, req.body.body)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const remove = (req: Request<ReviewParamsDto>, res: Response, next: NextFunction): void => {
  const user = req.user as TokenData;
  ReviewService.removeReview(user.id, req.params.reviewId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
