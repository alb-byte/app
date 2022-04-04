import { NextFunction, Request, Response } from 'express';
import { TokenData } from '../models/request/TokenData';
import {
  CreateCommentDto,
  GetManyCommentsDto,
  GetOneCommentDto,
  RemoveCommentDto,
  UpdateCommentDto,
} from '../newLib/dto';
import * as CommentService from '../services/comment';

export const getMany = (
  req: Request<{ postId: string }, unknown, unknown, GetManyCommentsDto>,
  res: Response,
  next: NextFunction,
) => {
  CommentService.getMany(req.params.postId, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getOne = (req: Request<GetOneCommentDto>, res: Response, next: NextFunction) => {
  CommentService.getOne(req.params.commentId)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const create = (
  req: Request<Pick<CreateCommentDto, 'postId'>, unknown, Pick<CreateCommentDto, 'body'>>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  CommentService.create(user.id, req.params.postId, req.body.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const update = (
  req: Request<Omit<UpdateCommentDto, 'body'>, unknown, Pick<UpdateCommentDto, 'body'>>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  CommentService.update(user.id, req.params.commentId, req.body.body)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const remove = (req: Request<RemoveCommentDto>, res: Response, next: NextFunction): void => {
  const user = req.user as TokenData;
  CommentService.remove(user.id, req.params.commentId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
