import { NextFunction, Request, Response } from 'express';
import { TokenData } from '../models/request/TokenData';
import * as RatingService from '../services/rating';
import { ScoreRatingDto, UserIdDto } from '../newLib/dto';

export const create = (
  req: Request<UserIdDto, unknown, ScoreRatingDto>,
  res: Response,
  next: NextFunction,
): void => {
  //   const isValid = validateCreatePostDto(req.body);
  //   if (!isValid) return next(validateCreatePostDto.errors);
  const user = req.user as TokenData;
  RatingService.addRating(user.id, req.params.userId, req.body.score)
    .then(() => res.sendStatus(204))
    .catch(next);
};

export const remove = (req: Request<UserIdDto>, res: Response, next: NextFunction): void => {
  //   const isValid = validateCreatePostDto(req.body);
  //   if (!isValid) return next(validateCreatePostDto.errors);
  const user = req.user as TokenData;
  RatingService.removeRating(user.id, req.params.userId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
