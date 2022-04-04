import { NextFunction, Request, Response } from 'express';
import { TokenData } from '../models/request/TokenData';
import * as CommentService from '../services/comment';

export const getMany = (
  req: Request<{ postId: string }, unknown, unknown, { page: number }>,
  res: Response,
  next: NextFunction,
) => {
  CommentService.getMany(req.params.postId, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getOne = (
  req: Request<{ postId: string; commentId: string }>,
  res: Response,
  next: NextFunction,
) => {
  CommentService.getOne(req.params.commentId)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const create = (
  req: Request<{ postId: string }, unknown, { body: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  CommentService.create(user.id, req.params.postId, req.body.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const update = (
  req: Request<{ postId: string; commentId: string }, unknown, { body: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  CommentService.update(user.id, req.params.commentId, req.body.body)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const remove = (
  req: Request<{ postId: string; commentId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  CommentService.remove(user.id, req.params.commentId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
