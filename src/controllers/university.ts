import { NextFunction, Request, Response } from 'express';
import * as UniversityService from '../services/university';
import { UniversityBodyDto } from '../dto';

export const getMany = (
  req: Request<unknown, unknown, unknown, { page: number }>,
  res: Response,
  next: NextFunction,
): void => {
  UniversityService.getMany(req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getOne = (
  req: Request<{ universityId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  UniversityService.getOne(req.params.universityId)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const create = (
  req: Request<unknown, unknown, UniversityBodyDto>,
  res: Response,
  next: NextFunction,
): void => {
  UniversityService.create(req.body.name)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const update = (
  req: Request<{ universityId: string }, unknown, UniversityBodyDto>,
  res: Response,
  next: NextFunction,
): void => {
  UniversityService.update(req.params.universityId, req.body.name)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const remove = (
  req: Request<{ universityId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  UniversityService.remove(req.params.universityId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
