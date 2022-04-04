import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import { DoctorInfoModel, PacientInfoModel, UserModel } from '../models/models';
import { UserResponseDto } from '../newLib/dto/profile/UserResponseDto';
import { UserRelation } from '../newLib/enums/UserRelation';
import { DoctorInfoDto } from '../newLib/dto/profile/DoctorInfoDto';
import { PacientInfoDto } from '../newLib/dto/profile/PacientInfoDto';
import { UserType } from '../newLib/enums';
import { EditProfileRequestDto } from '../newLib/dto/profile/EditProfileRequestDto';
import { EditPacientInfoDto } from '../newLib/dto/profile/EditPacientInfoDto';
export const getOne = async (authUserId: string, userId: string): Promise<UserResponseDto> => {
  let user: Omit<UserResponseDto, 'userInfo'> | null = null;
  if (authUserId === userId) {
    const userFromDb = await UserModel.findById(userId, {
      friendRequests: 0,
      friends: 0,
      password: 0,
      refreshSessions: 0,
      confirmSessions: 0,
      subscriptions: 0,
      isVerified: 0,
    }).lean();
    if (userFromDb) {
      user = {
        _id: userFromDb._id.toString(),
        email: userFromDb.email,
        firstName: userFromDb.firstName,
        lastName: userFromDb.lastName,
        sex: userFromDb.sex,
        userType: userFromDb.userType,
        aboutMe: userFromDb.aboutMe,
        avatar: userFromDb.avatar,
        isBlocked: userFromDb.isBlocked,
        relation: UserRelation.Me,
        showInfo: userFromDb.showInfo,
        isAproved: userFromDb.isAproved,
        createdAt: userFromDb.createdAt,
        updatedAt: userFromDb.updatedAt,
      };
    }
  } else {
    const users = await Promise.all([
      UserModel.findById(authUserId, {
        subscriptions: 1,
        subscribers: 1,
        friends: 1,
      }).lean(),
      UserModel.findById(userId, {
        subscribers: 0,
        friends: 0,
        password: 0,
        refreshSessions: 0,
        confirmSessions: 0,
        subscriptions: 0,
        isVerified: 0,
      }).lean(),
    ]);
    const userFromDb = users[1];
    if (userFromDb) {
      let relation = UserRelation.Unknown;
      if (users[0]) {
        if (users[0].friends.includes(new Types.ObjectId(userId))) relation = UserRelation.Friend;
        else if (users[0].subscribers.includes(new Types.ObjectId(userId)))
          relation = UserRelation.IncomingRequest;
        else if (users[0].subscriptions.includes(new Types.ObjectId(authUserId)))
          relation = UserRelation.OutgoingRequest;
      }
      user = {
        _id: userFromDb._id.toString(),
        email: userFromDb.email,
        firstName: userFromDb.firstName,
        lastName: userFromDb.lastName,
        sex: userFromDb.sex,
        userType: userFromDb.userType,
        aboutMe: userFromDb.aboutMe,
        avatar: userFromDb.avatar,
        isBlocked: userFromDb.isBlocked,
        relation,
        showInfo: userFromDb.showInfo,
        isAproved: userFromDb.isAproved,
        createdAt: userFromDb.createdAt,
        updatedAt: userFromDb.updatedAt,
      };
    }
  }
  if (!user) throw createHttpError(404, 'user not found');
  let userInfo: DoctorInfoDto | PacientInfoDto | null | null = null;
  if (user.userType === UserType.PACIENT) {
    userInfo = await PacientInfoModel.findOne(
      { userId: user._id },
      {
        createdAt: 0,
        updatedAt: 0,
        userId: 0,
        _id: 0,
      },
    ).lean();
  } else {
    userInfo = await DoctorInfoModel.findOne(
      { userId: user._id },
      {
        createdAt: 0,
        updatedAt: 0,
        userId: 0,
        _id: 0,
      },
    ).lean();
  }
  return { ...user, userInfo };
};
export const edit = async (
  userId: string,
  dto: EditProfileRequestDto,
): Promise<UserResponseDto> => {
  const userFromDb = await UserModel.findByIdAndUpdate(
    userId,
    {
      ...dto,
    },
    {
      subscribers: 0,
      subscriptions: 0,
      friends: 0,
      password: 0,
      refreshSessions: 0,
      confirmSessions: 0,
      isVerified: 0,
      new: true,
    },
  ).lean();
  if (userFromDb) {
    let user: Omit<UserResponseDto, 'userInfo'> | null = null;
    user = {
      _id: userFromDb._id.toString(),
      email: userFromDb.email,
      firstName: userFromDb.firstName,
      lastName: userFromDb.lastName,
      sex: userFromDb.sex,
      userType: userFromDb.userType,
      aboutMe: userFromDb.aboutMe,
      avatar: userFromDb.avatar,
      isBlocked: userFromDb.isBlocked,
      relation: UserRelation.Me,
      showInfo: userFromDb.showInfo,
      isAproved: userFromDb.isAproved,
      createdAt: userFromDb.createdAt,
      updatedAt: userFromDb.updatedAt,
    };
    return { ...user, userInfo: null };
  } else throw createHttpError(404, 'user not found');
};

export const editDoctorInfo = async (
  userId: string,
  dto: DoctorInfoDto,
): Promise<DoctorInfoDto> => {
  const userInfoFromDb = await DoctorInfoModel.findOneAndUpdate(
    { userId },
    {
      ...dto,
    },
    {
      createdAt: 0,
      updatedAt: 0,
      userId: 0,
      _id: 0,
      new: true,
    },
  ).lean();
  await UserModel.findByIdAndUpdate(userId, { $set: { isAproved: false } });
  if (userInfoFromDb) {
    return {
      address: userInfoFromDb.address,
      firstSpeciality: userInfoFromDb.firstSpeciality.toString(),
      secondSpeciality: userInfoFromDb.secondSpeciality.toString(),
      academicDegree: userInfoFromDb.academicDegree,
      category: userInfoFromDb.category,
      type: userInfoFromDb.type,
      university: userInfoFromDb.university.toString(),
      universityGraduationYear: userInfoFromDb.universityGraduationYear,
    };
  } else throw createHttpError(404, 'user not found');
};
export const editPacientInfo = async (
  userId: string,
  dto: EditPacientInfoDto,
): Promise<PacientInfoDto> => {
  const { showInfo, ...pacientInfoDto } = dto;
  const userInfoFromDb = await PacientInfoModel.findOneAndUpdate(
    { userId },
    {
      ...pacientInfoDto,
    },
    {
      createdAt: 0,
      updatedAt: 0,
      userId: 0,
      _id: 0,
      new: true,
      upsert: true,
    },
  ).lean();
  await UserModel.findByIdAndUpdate(userId, {
    $set: { showInfo, userInfo: userInfoFromDb._id },
  });
  if (userInfoFromDb) {
    return userInfoFromDb;
  } else throw createHttpError(404, 'user not found');
};
