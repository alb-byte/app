import { NextFunction, Request, Response } from 'express';
import * as ProfileService from '../services/profile';
import { TokenData } from '../models/TokenData';
import { EditProfileRequestDto } from '../dto/profile/EditProfileRequestDto';
import { DoctorInfoDto } from '../dto/profile/DoctorInfoDto';
import { UserType } from '../enums';
import { EditPacientInfoDto } from '../dto/profile/EditPacientInfoDto';

export const getOne = (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  ProfileService.getOne(user.id, req.params.userId)
    .then((dto) => res.json(dto))
    .catch(next);
};

export const me = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user as TokenData;
  ProfileService.getOne(user.id, user.id)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const edit = (
  req: Request<unknown, unknown, EditProfileRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;

  ProfileService.edit(user.id, req.body)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const editInfo = (
  req: Request<{ userId: string }, unknown, DoctorInfoDto | EditPacientInfoDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  if (user.userType === UserType.DOCTOR) {
    const payload = req.body as DoctorInfoDto;
    ProfileService.editDoctorInfo(user.id, payload)
      .then(() => res.sendStatus(204))
      .catch(next);
  } else {
    const payload = req.body as EditPacientInfoDto;
    ProfileService.editPacientInfo(user.id, payload)
      .then(() => res.sendStatus(204))
      .catch(next);
  }
};
