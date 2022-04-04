import { NextFunction, Request, Response } from 'express';
import SearchUserDto, {
  validate as validateSearchUserDto,
} from '../models/request/search/SearchUserDto';

import SearchDoctorDto, {
  validate as validateSearchDoctorDto,
} from '../models/request/search/SearchDoctorDto';
import * as SearchService from '../services/search';
import { TokenData } from '../models/request/TokenData';

export const searchUser = (
  req: Request<unknown, SearchUserDto>,
  res: Response,
  next: NextFunction,
): void => {
  const isValid = validateSearchUserDto(req.body);
  if (!isValid) return next(validateSearchUserDto.errors);
  const user = req.user as TokenData;
  SearchService.searchUser(user.id, req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const searchDoctor = (
  req: Request<unknown, SearchDoctorDto>,
  res: Response,
  next: NextFunction,
): void => {
  const isValid = validateSearchDoctorDto(req.body);
  if (!isValid) return next(validateSearchDoctorDto.errors);
  const user = req.user as TokenData;

  SearchService.searchDoctor(user.id, req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
