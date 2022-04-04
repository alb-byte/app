import { NextFunction, Request, Response } from 'express';
import * as ReportService from '../services/report';
import { TokenData } from '../models/request/TokenData';

export const getMany = (
  req: Request<{ userId: string }, unknown, unknown, { page: number }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReportService.getManyReport(user.id, req.params.userId, req.query.page)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getOne = (
  req: Request<{ userId: string; reportId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReportService.getOneReport(user.id, req.params.userId, req.params.reportId)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const create = (
  req: Request<{ userId: string }, unknown, { body: string; isChecked: boolean }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReportService.addReport(user.id, req.params.userId, req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const update = (
  req: Request<{ userId: string; reportId: string }, unknown, { body: string; isChecked: boolean }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReportService.updateReport(user.id, req.params.reportId, req.body)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const remove = (
  req: Request<{ userId: string; reportId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReportService.removeReport(user.id, req.params.reportId)
    .then(() => res.sendStatus(204))
    .catch(next);
};
