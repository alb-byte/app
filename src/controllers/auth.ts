import { NextFunction, Request, Response } from 'express';
import { validate as validateLoginDto } from '../models/request/auth/LoginDto';
import { validate as validateLogoutDto } from '../models/request/auth/LogoutDto';
import { validate as validateRefreshDto } from '../models/request/auth/RefreshDto';
import { validate as validateConfirmDto } from '../models/request/auth/ConfirmDto';
import { validate as validateResendDto } from '../models/request/auth/ResendDto';
import { validate as validateRegistrationDto } from '../models/request/auth/RegistrationDto';
import * as AuthService from '../services/auth';
import { RegistrationRequestDto } from '../newLib/dto/auth/RegistrationRequestDto';
import { LoginRequestDto } from '../newLib/dto/auth/LoginRequestDto';
import { RefreshTokenRequestDto } from '../newLib/dto/auth/RefreshTokenRequestDto';
import { ConfirmCodeRequestDto } from '../newLib/dto/auth/ConfirmCodeRequestDto';
import { ResendCodeRequestDto } from '../newLib/dto/auth/ResendCodeRequestDto';
export const registration = (
  req: Request<unknown, unknown, RegistrationRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  const isValid = validateRegistrationDto(req.body);
  if (!isValid) return next(validateRegistrationDto.errors);
  AuthService.registration(req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const login = (
  req: Request<unknown, unknown, LoginRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  const isValid = validateLoginDto(req.body);
  if (!isValid) return next(validateLoginDto.errors);
  AuthService.login(req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const confirmation = (
  req: Request<unknown, unknown, ConfirmCodeRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  const isValid = validateConfirmDto(req.body);
  if (!isValid) return next(validateConfirmDto.errors);
  AuthService.confirmation(req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const resend = (
  req: Request<unknown, unknown, ResendCodeRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  const isValid = validateResendDto(req.body);
  if (!isValid) return next(validateResendDto.errors);
  AuthService.resend(req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const refresh = (
  req: Request<unknown, unknown, RefreshTokenRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  const isValid = validateRefreshDto(req.body);
  if (!isValid) return next(validateRefreshDto.errors);
  AuthService.refresh(req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const logout = (
  req: Request<unknown, unknown, RefreshTokenRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  const isValid = validateLogoutDto(req.body);
  if (!isValid) return next(validateLogoutDto.errors);
  AuthService.logout(req.body)
    .then(() => res.sendStatus(200))
    .catch(next);
};
