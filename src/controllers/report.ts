import { NextFunction, Request, Response } from 'express';
import * as ReportService from '../services/report';
import { TokenData } from '../models/TokenData';
import { PageDto, CreateReportRequestDto } from '../dto';

export const getMany = (
  req: Request<unknown, unknown, unknown, PageDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReportService.getManyReport(user.id, req.query.page)
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
  req: Request<unknown, unknown, CreateReportRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ReportService.addReport(user.id, req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const update = (
  req: Request<{ userId: string; reportId: string }, unknown, any>,
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
