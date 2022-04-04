import { NextFunction, Request, Response } from 'express';
import GetMediaDto, { validate as validateGetMediaDto } from '../models/request/media/GetMediaDto';
import * as MediaService from '../services/media';
import { BadRequestError } from '../models/exception/httpError';
export const upload = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.file) return next(new BadRequestError('File is required'));
  MediaService.save(req.file)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const getSm = (req: Request<GetMediaDto>, res: Response, next: NextFunction): void => {
  const isValid = validateGetMediaDto(req.params);
  if (!isValid) return next(validateGetMediaDto.errors);

  MediaService.get(req.params, 200, 200)
    .then((fileBuffer) => res.send(fileBuffer))
    .catch(next);
  res.contentType('jpg');
};
export const getMd = (req: Request<GetMediaDto>, res: Response, next: NextFunction): void => {
  const isValid = validateGetMediaDto(req.params);
  if (!isValid) return next(validateGetMediaDto.errors);

  MediaService.get(req.params, 400, 400)
    .then((fileBuffer) => res.send(fileBuffer))
    .catch(next);
  res.contentType('jpg');
};
export const getLg = (req: Request<GetMediaDto>, res: Response, next: NextFunction): void => {
  const isValid = validateGetMediaDto(req.params);
  if (!isValid) return next(validateGetMediaDto.errors);

  MediaService.get(req.params, 1000, 1000)
    .then((fileBuffer) => res.send(fileBuffer))
    .catch(next);
  res.contentType('jpg');
};
