import { NextFunction, Request, Response } from 'express';
import * as PostService from '../services/post';
import GetUserPostsDto, {
  validate as validateGetUserPostsDto,
} from '../models/request/post/GetUserPostsDto';
import GetPostDto, { validate as validateGetPostDto } from '../models/request/post/GetPostDto';
import UpdatePostDto, {
  validate as validateUpdatePostDto,
} from '../models/request/post/UpdatePostDto';
import CreatePostDto, {
  validate as validateCreatePostDto,
} from '../models/request/post/CreatePostDto';
import { TokenData } from '../models/request/TokenData';

export const create = (
  req: Request<{ postId: string }, CreatePostDto>,
  res: Response,
  next: NextFunction,
): void => {
  res.json({ postId: req.params.postId });
  //   const isValid = validateCreatePostDto(req.body);
  //   if (!isValid) return next(validateCreatePostDto.errors);
  //   const user = req.user as TokenData;
  //   PostService.create(user.id, req.body)
  //     .then((dto) => res.json(dto))
  //     .catch(next);
};

export const remove = (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  res.json({ postId: req.params.postId });

  //   const isValid = validateGetPostDto(req.params);
  //   if (!isValid) return next(validateGetPostDto.errors);
  //   const user = req.user as TokenData;
  //   PostService.remove(user.id, req.params.id)
  //     .then((dto) => res.json(dto))
  //     .catch(next);
};
