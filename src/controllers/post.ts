import { NextFunction, Request, Response } from 'express';
import * as PostService from '../services/post';
import { TokenData } from '../models/request/TokenData';
import { CreatePostRequestDto, GetUserPostsQuery, UpdatePostRequestDto } from '../newLib/dto/post';

export const getMany = (
  req: Request<unknown, unknown, unknown, GetUserPostsQuery>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  PostService.getMany(user.id, req.query)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getOne = (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  PostService.getOne(user.id, req.params.postId)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const create = (
  req: Request<unknown, CreatePostRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  PostService.create(user.id, req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const update = (
  req: Request<{ postId: string }, UpdatePostRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  PostService.update(user.id, req.params.postId, req.body)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const remove = (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;

  PostService.remove(user.id, req.params.postId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
