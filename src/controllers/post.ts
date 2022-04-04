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

export const getMany = (req: Request, res: Response, next: NextFunction): void => {
  const query = req.query as unknown as GetUserPostsDto;
  const isValid = validateGetUserPostsDto(query);
  if (!isValid) return next(validateGetUserPostsDto.errors);

  PostService.getMany(query)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getOne = (req: Request<GetPostDto>, res: Response, next: NextFunction): void => {
  const isValid = validateGetPostDto(req.params);
  if (!isValid) return next(validateGetPostDto.errors);

  PostService.getOne(req.params.id)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const create = (
  req: Request<unknown, CreatePostDto>,
  res: Response,
  next: NextFunction,
): void => {
  const isValid = validateCreatePostDto(req.body);
  if (!isValid) return next(validateCreatePostDto.errors);
  const user = req.user as TokenData;

  PostService.create(user.id, req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const update = (
  req: Request<unknown, UpdatePostDto>,
  res: Response,
  next: NextFunction,
): void => {
  const isValid = validateUpdatePostDto(req.body);
  if (!isValid) return next(validateUpdatePostDto.errors);
  const user = req.user as TokenData;

  PostService.update(user.id, req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const remove = (req: Request<GetPostDto>, res: Response, next: NextFunction): void => {
  const isValid = validateGetPostDto(req.params);
  if (!isValid) return next(validateGetPostDto.errors);
  const user = req.user as TokenData;

  PostService.remove(user.id, req.params.id)
    .then((dto) => res.json(dto))
    .catch(next);
};
