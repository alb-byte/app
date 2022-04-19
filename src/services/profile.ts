import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import {
  DoctorInfoModel,
  PacientInfoModel,
  RatingModel,
  ReviewModel,
  UserModel,
} from '../models/entities';
import { UserResponseDto } from '../dto/profile/UserResponseDto';
import { UserRelation } from '../enums/UserRelation';
import { DoctorInfoDto } from '../dto/profile/DoctorInfoDto';
import { PacientInfoDto } from '../dto/profile/PacientInfoDto';
import { UserType } from '../enums';
import { EditProfileRequestDto } from '../dto/profile/EditProfileRequestDto';
import { EditPacientInfoDto } from '../dto/profile/EditPacientInfoDto';
import { DoctorInfoResponseDto } from '../dto/profile/DoctorInfoResponseDto';
import { IRating } from '../models/interfaces';
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
        if (users[0].friends.map((i) => i.toString()).includes(userId))
          relation = UserRelation.Friend;
        else if (users[0].subscribers.map((i) => i.toString()).includes(userId))
          relation = UserRelation.IncomingRequest;
        else if (users[0].subscriptions.map((i) => i.toString()).includes(userId))
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
  let userInfo: DoctorInfoResponseDto | PacientInfoDto | null | null = null;
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
    const allDoctorInfo = await Promise.all([
      DoctorInfoModel.findOne<DoctorInfoDto>(
        { user: user._id },
        {
          createdAt: 0,
          updatedAt: 0,
          userId: 0,
          _id: 0,
        },
      ).lean(),
      RatingModel.aggregate<{
        _id: Types.ObjectId;
        totalRatingCount: number;
        avgRating: number;
        scores: Array<IRating>;
      }>([
        {
          $match: { doctorId: new Types.ObjectId(user._id) },
        },
        {
          $group: {
            _id: '$doctorId',
            totalRatingCount: {
              $count: {},
            },
            avgRating: {
              $avg: '$score',
            },
          },
        },
        {
          $lookup: {
            from: 'ratings',
            localField: '_id',
            foreignField: 'doctorId',
            as: 'scores',
          },
        },
      ]),
      ReviewModel.countDocuments({ doctor: user._id }),
    ]);
    if (allDoctorInfo[0])
      userInfo = {
        ...allDoctorInfo[0],
        totalReviewCount: allDoctorInfo[2],
        totalRatingCount: allDoctorInfo[1][0]?.totalRatingCount || 0,
        myRating: allDoctorInfo[1][0]
          ? allDoctorInfo[1][0].scores.find((i) => i.userId.toString() === authUserId)?.score ||
            null
          : null,
        avgRating: allDoctorInfo[1][0]?.avgRating || 0,
      };
  }
  return {
    ...user,
    showInfo:
      user.relation === UserRelation.Friend || (user.relation === UserRelation.Me && user.showInfo),
    userInfo,
  };
};
export const edit = async (userId: string, dto: EditProfileRequestDto): Promise<void> => {
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
  if (!userFromDb) throw createHttpError(404, 'user not found');
};

export const editDoctorInfo = async (userId: string, dto: DoctorInfoDto): Promise<void> => {
  const userInfoFromDb = await DoctorInfoModel.findOneAndUpdate(
    { user: userId },
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
  if (!userInfoFromDb) throw createHttpError(404, 'user not found');
};
export const editPacientInfo = async (userId: string, dto: EditPacientInfoDto): Promise<void> => {
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
  if (!userInfoFromDb) throw createHttpError(404, 'user not found');
};
