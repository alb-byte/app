import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../libs/config';
import { BadRequestError } from '../exception/httpError';
import * as MailService from './mail';
import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import {
  ConfirmSessionModel,
  DoctorInfoModel,
  PacientInfoModel,
  RefreshSessionModel,
  UserModel,
} from '../models/entities';
import { UserType } from '../enums';
import { IConfirmSession, IRefreshSession } from '../models/interfaces';
import { LoginRequestDto } from '../dto/auth/LoginRequestDto';
import { RegistrationRequestDto } from '../dto/auth/RegistrationRequestDto';
import { RefreshTokenRequestDto } from '../dto/auth/RefreshTokenRequestDto';
import { ConfirmCodeRequestDto } from '../dto/auth/ConfirmCodeRequestDto';
import { ResendCodeRequestDto } from '../dto/auth/ResendCodeRequestDto';
import { AuthResponseDto } from '../dto/auth/AuthResponseDto';
import { AuthMessageResponseDto } from '../dto/auth/AuthMessageResponseDto';
interface AccessTokenDto {
  _id: string;
  userType: UserType;
}
const generateAccessToken = (dto: AccessTokenDto): string =>
  jwt.sign({ id: dto._id, userType: dto.userType }, config.auth.accessTokenSecret, {
    expiresIn: config.auth.accessTokenLife,
  });
const generateRandomToken = (): string => crypto.randomBytes(40).toString('hex');
const generateRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};
//------------------------Refresh---------------------------
const isValidSessionsCount = async (userId: string): Promise<boolean> => {
  const countActiveSession = await RefreshSessionModel.countDocuments({ userId });
  return countActiveSession < config.auth.maxRefreshSessionsCount;
};
const wipeAllUserRefreshSessions = async (userId: string): Promise<void> => {
  await RefreshSessionModel.deleteMany({ userId });
};
const addRefreshSession = async (refreshSession: IRefreshSession): Promise<void> => {
  const refresh = new RefreshSessionModel({
    userId: refreshSession.userId,
    token: refreshSession.token,
    expiresIn: refreshSession.expiresIn,
  });
  await refresh.save();
};
const getRefreshSession = async (token: string): Promise<any> => {
  return RefreshSessionModel.findOne({ token }).lean();
};
const verifyRefreshSession = (oldRefreshSession: any): boolean => {
  return Date.now() < oldRefreshSession.expiresIn;
};
const deleteRefreshSession = async (token: string): Promise<void> => {
  await RefreshSessionModel.deleteOne({ token });
};
const generateRefreshSession = (userId: string): IRefreshSession => ({
  userId: new Types.ObjectId(userId),
  token: generateRandomToken(),
  expiresIn: Date.now() + config.auth.refreshTokenLife * 1000,
});
//------------------------Confirm---------------------------
const wipeAllUserConfirmSessions = async (userId: string): Promise<void> => {
  await ConfirmSessionModel.deleteMany({ userId });
};
const verifyConfirmSession = (confirmSession: any): boolean => {
  return Date.now() < confirmSession.expiresIn;
};
const addConfirmSession = async (confirmSession: IConfirmSession): Promise<void> => {
  const confirm = new ConfirmSessionModel({
    userId: confirmSession.userId,
    token: confirmSession.token,
    expiresIn: confirmSession.expiresIn,
  });
  await confirm.save();
};

const generateConfirmSession = (userId: string): IConfirmSession => {
  const randomNumber: string = generateRandomInt(100000, 1000000) as unknown as string;
  return {
    userId: new Types.ObjectId(userId),
    token: randomNumber,
    expiresIn: Date.now() + config.auth.refreshTokenLife * 1000,
  };
};
//-------------------public----------------

export const login = async (dto: LoginRequestDto): Promise<AuthResponseDto> => {
  const user = await UserModel.findOne(
    { email: dto.email },
    {
      _id: 1,
      email: 1,
      userType: 1,
      password: 1,
      isVerified: 1,
    },
  ).lean();
  if (!user || !bcrypt.compareSync(dto.password, user.password))
    throw new BadRequestError('Неверный логин или пароль');
  if (!user.isVerified) throw new BadRequestError('Аккаунт не верифицирован, проверьте почту');
  const accessToken = generateAccessToken({ _id: user._id.toString(), userType: user.userType });
  const refreshSession = generateRefreshSession(user._id.toString());
  if (!(await isValidSessionsCount(user._id.toString()))) {
    await wipeAllUserRefreshSessions(user._id.toString());
  }
  await addRefreshSession(refreshSession);
  return { accessToken, refreshToken: refreshSession.token };
};

export const registration = async (
  dto: RegistrationRequestDto,
): Promise<AuthMessageResponseDto> => {
  const emailIsExists = await UserModel.exists({ email: dto.email });
  if (emailIsExists) throw new BadRequestError('Пользователь с этой почтой уже зарегистрирован');
  const { doctorInfo, ...userInfo } = dto;
  const passwordHash = bcrypt.hashSync(dto.password, 8);
  const user = new UserModel({
    ...userInfo,
    password: passwordHash,
    avatar: null,
    aboutMe: null,
    showInfo: false,
    isVerified: false,
    isAproved: false,
    isBlocked: false,
  });
  const savedUser = await user.save();
  const confirmSession = generateConfirmSession(savedUser._id.toString());
  const promises = [
    addConfirmSession(confirmSession),
    MailService.sendMail(dto.email, `${dto.lastName} ${dto.firstName}`, confirmSession.token),
  ];
  if (dto.userType === UserType.DOCTOR) {
    promises.push(
      DoctorInfoModel.create({ ...doctorInfo, user: user._id }).then(async (docInfo) => {
        await UserModel.findByIdAndUpdate(user._id, { $set: { userInfo: docInfo._id } });
      }),
    );
  } else if (dto.userType === UserType.PACIENT) {
    promises.push(
      PacientInfoModel.create({
        userId: user._id,
        heartDisease: false,
        bloodDisease: false,
        liverDisease: false,
        kidneyDisease: false,
        lungDisease: false,
        skinDisease: false,
        infectiousDisease: false,
        bowelDisease: false,
        eyeDisease: false,
        entDisease: false,
        pacemakerPresence: false,
        epilepsy: false,
        //
        injury: false,
        operations: false,
        bloodTransfusion: false,
        concussion: false,
        radiationChemoTherapy: false,
        //
        allergy: {
          antibiotics: false,
          iodinePreparations: false,
          hormonalPreparations: false,
          pollen: false,
          foodProducts: false,
          animal: false,
        },
        smoking: false,
        pregnancy: false,
        lactation: false,
        contraceptives: false,
      }).then(async (info) => {
        await UserModel.findByIdAndUpdate(user._id, { $set: { userInfo: info._id } });
      }),
    );
  }
  await Promise.all(promises);

  return {
    message: `A verification email has been sent to ${dto.email} 
    . It will be expire after one day. If you not get verification Email click on resend token.`,
    userId: savedUser._id.toString(),
  };
};
export const logout = async (dto: RefreshTokenRequestDto): Promise<void> => {
  const oldRefreshSession = await getRefreshSession(dto.refreshToken);

  if (!(await verifyRefreshSession(oldRefreshSession)))
    throw new BadRequestError('Token is expired');
  return deleteRefreshSession(dto.refreshToken);
};
export const refresh = async (dto: RefreshTokenRequestDto): Promise<AuthResponseDto> => {
  const oldRefreshSession = await getRefreshSession(dto.refreshToken);

  if (!(await verifyRefreshSession(oldRefreshSession)))
    throw new BadRequestError('Token is expired');

  await deleteRefreshSession(dto.refreshToken);

  const user = await UserModel.findById(oldRefreshSession.userId, {
    _id: 1,
    email: 1,
    userType: 1,
  }).lean();
  if (!user) throw createHttpError(404, 'User not found');
  const accessToken = generateAccessToken({ _id: user._id.toString(), userType: user.userType });
  const refreshSession = generateRefreshSession(user._id.toString());
  await addRefreshSession(refreshSession);
  return { accessToken, refreshToken: refreshSession.token };
};
export const confirmation = async (dto: ConfirmCodeRequestDto): Promise<AuthMessageResponseDto> => {
  const savedUser = await UserModel.findOne({ email: dto.email });
  const savedConfirmSession = await ConfirmSessionModel.findOne(
    { token: dto.token },
    { userId: 1, expiresIn: 1 },
  );
  if (!savedUser) throw new BadRequestError('Пользователь с такой почтой не зарегистрирован');
  else if (savedUser.isVerified)
    return {
      userId: savedUser._id.toString(),
      message: 'Пользователь верифицирован, пожалуйста выполните вход',
    };
  else if (
    !savedConfirmSession ||
    savedConfirmSession.userId.toString() !== savedUser._id.toString()
  )
    throw new BadRequestError('Неверный код');
  else if (!verifyConfirmSession(savedConfirmSession))
    throw new BadRequestError('Token is expired');
  else {
    savedUser.isVerified = true;
    await savedUser.save();
    await wipeAllUserConfirmSessions(savedUser._id.toString());
    return { userId: savedUser._id.toString(), message: 'Ваш аккаунт успешно верифицирован' };
  }
};
export const resend = async (dto: ResendCodeRequestDto): Promise<AuthMessageResponseDto> => {
  const savedUser = await UserModel.findOne({ email: dto.email }).lean();
  if (!savedUser) throw new BadRequestError('Пользователь с такой почтой не зарегистрирован ');
  else if (savedUser.isVerified)
    return {
      userId: savedUser._id.toString(),
      message: 'Пользователь уже верифицирован, пожалуйста выполните вход',
    };
  else {
    const confirmSession = generateConfirmSession(savedUser._id.toString());
    await addConfirmSession(confirmSession);
    const fullName = `${savedUser.lastName} ${savedUser.firstName}`;
    await MailService.sendMail(dto.email, fullName, confirmSession.token);

    return {
      message: `A verification email has been sent to ${dto.email} 
      . It will be expire after one day. If you not get verification Email click on resend token.`,
      userId: savedUser._id.toString(),
    };
  }
};
{
}
