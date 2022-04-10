import { NextFunction, Request, Response } from 'express';
import { validate as validateEditProfileDto } from '../models/request/profile/EditProfileDto';
import { validate as validateDoctorInfoDto } from '../models/request/profile/EditDoctorInfo';
import { validate as validatePacientInfoDto } from '../models/request/profile/EditPacientInfo';
import * as ProfileService from '../services/profile';
import { TokenData } from '../models/request/TokenData';
import { EditProfileRequestDto } from '../newLib/dto/profile/EditProfileRequestDto';
import { DoctorInfoDto } from '../newLib/dto/profile/DoctorInfoDto';
import { UserType } from '../newLib/enums';
import { EditPacientInfoDto } from '../newLib/dto/profile/EditPacientInfoDto';
import { GetOnePostDto, UserIdDto } from '../newLib/dto';

export const getOne = (req: Request<GetOnePostDto>, res: Response, next: NextFunction): void => {
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
  const isValid = validateEditProfileDto(req.body);
  if (!isValid) return next(validateEditProfileDto.errors);
  const user = req.user as TokenData;

  ProfileService.edit(user.id, req.body)
    .then(() => res.sendStatus(204))
    .catch(next);
};
export const editInfo = (
  req: Request<UserIdDto, unknown, DoctorInfoDto | EditPacientInfoDto>,
  res: Response,
  next: NextFunction,
): void => {
  const user = req.user as TokenData;
  if (user.userType === UserType.DOCTOR) {
    const payload = req.body as DoctorInfoDto;
    const isValid = validateDoctorInfoDto(req.body);
    if (!isValid) return next(validateDoctorInfoDto.errors);
    ProfileService.editDoctorInfo(user.id, payload)
      .then(() => res.sendStatus(204))
      .catch(next);
  } else {
    const payload = req.body as EditPacientInfoDto;
    const isValid = validatePacientInfoDto(req.body);
    if (!isValid) return next(validatePacientInfoDto.errors);
    ProfileService.editPacientInfo(user.id, payload)
      .then(() => res.sendStatus(204))
      .catch(next);
  }
};
