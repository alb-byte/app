import { NextFunction, Request, Response } from 'express';
import * as SpecialityService from '../services/speciality';
import { SpecialityBodyDto } from '../dto';

export const getMany = (
  req: Request<unknown, unknown, unknown, { page: number }>,
  res: Response,
  next: NextFunction,
): void => {
  SpecialityService.getMany(req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getOne = (
  req: Request<{ specialityId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  SpecialityService.getOne(req.params.specialityId)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const create = (
  req: Request<unknown, unknown, SpecialityBodyDto>,
  res: Response,
  next: NextFunction,
): void => {
  SpecialityService.create(req.body.name)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const update = (
  req: Request<{ specialityId: string }, unknown, SpecialityBodyDto>,
  res: Response,
  next: NextFunction,
): void => {
  SpecialityService.update(req.params.specialityId, req.body.name)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const remove = (
  req: Request<{ specialityId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  SpecialityService.remove(req.params.specialityId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
