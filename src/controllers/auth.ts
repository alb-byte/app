import { NextFunction, Request, Response } from 'express';
import * as AuthService from '../services/auth';
import { RegistrationRequestDto } from '../dto/auth/RegistrationRequestDto';
import { LoginRequestDto } from '../dto/auth/LoginRequestDto';
import { RefreshTokenRequestDto } from '../dto/auth/RefreshTokenRequestDto';
import { ConfirmCodeRequestDto } from '../dto/auth/ConfirmCodeRequestDto';
import { ResendCodeRequestDto } from '../dto/auth/ResendCodeRequestDto';
export const registration = (
  req: Request<unknown, unknown, RegistrationRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  AuthService.registration(req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const login = (
  req: Request<unknown, unknown, LoginRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  AuthService.login(req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const confirmation = (
  req: Request<unknown, unknown, ConfirmCodeRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  AuthService.confirmation(req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const resend = (
  req: Request<unknown, unknown, ResendCodeRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  AuthService.resend(req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const refresh = (
  req: Request<unknown, unknown, RefreshTokenRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  AuthService.refresh(req.body)
    .then((dto) => res.json(dto))
    .catch(next);
};
export const logout = (
  req: Request<unknown, unknown, RefreshTokenRequestDto>,
  res: Response,
  next: NextFunction,
): void => {
  AuthService.logout(req.body)
    .then(() => res.sendStatus(200))
    .catch(next);
};
