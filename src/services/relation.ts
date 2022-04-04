import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import { UserModel } from '../models/models';
import { ItemList } from '../newLib/dto';
import { UserPreviewResponseDto } from '../newLib/dto/user/UserPreviewResponseDto';
import { UserType } from '../newLib/enums';
import { UserRelation } from '../newLib/enums/UserRelation';
const PAGE_SIZE = 5;

export const getSubscriptions = async (
  authUserId: string,
  page: number,
): Promise<ItemList<UserPreviewResponseDto>> => {
  const result = await Promise.all([
    UserModel.findById(authUserId, {
      subscriptions: 1,
    }).populate<{
      subscriptions: Array<{
        _id: string;
        firstName: string;
        lastName: string;
        avatar: string | null;
        userType: UserType;
      }>;
    }>({
      path: 'subscriptions',
      select: '_id firstName lastName avatar userType',
      options: {
        limit: PAGE_SIZE,
        sort: { firstName: -1 },
        skip: (page - 1) * PAGE_SIZE,
      },
    }),
    UserModel.findById(authUserId, { subscriptions: 1 }),
  ]);
  if (result[0] && result[1])
    return {
      items: result[0].subscriptions.map((i) => ({ ...i, relation: UserRelation.OutgoingRequest })),
      totalCount: result[1].subscriptions.length,
    };
  else throw createHttpError(404, 'user not found');
};
export const getSubscribers = async (
  authUserId: string,
  page: number,
): Promise<ItemList<UserPreviewResponseDto>> => {
  const result = await Promise.all([
    UserModel.findById(authUserId, {
      subscriptions: 1,
    }).populate<{
      subscribers: Array<{
        _id: string;
        firstName: string;
        lastName: string;
        avatar: string | null;
        userType: UserType;
      }>;
    }>({
      path: 'subscribers',
      select: '_id firstName lastName avatar userType',
      options: {
        limit: PAGE_SIZE,
        sort: { firstName: -1 },
        skip: (page - 1) * PAGE_SIZE,
      },
    }),
    UserModel.findById(authUserId, { subscribers: 1 }),
  ]);
  if (result[0] && result[1])
    return {
      items: result[0].subscribers.map((i) => ({ ...i, relation: UserRelation.IncomingRequest })),
      totalCount: result[1].subscribers.length,
    };
  else throw createHttpError(404, 'user not found');
};
export const getFriends = async (
  authUserId: string,
  page: number,
): Promise<ItemList<UserPreviewResponseDto>> => {
  const result = await Promise.all([
    UserModel.findById(authUserId, {
      friends: 1,
    })
      .populate<{
        friends: Array<{
          _id: string;
          firstName: string;
          lastName: string;
          avatar: string | null;
          userType: UserType;
        }>;
      }>({
        path: 'friends',
        select: '_id firstName lastName avatar userType',
        options: {
          limit: PAGE_SIZE,
          sort: { firstName: -1 },
          skip: (page - 1) * PAGE_SIZE,
        },
      })
      .lean(),
    UserModel.findById(authUserId, { friends: 1 }),
  ]);
  if (result[0] && result[1])
    return {
      items: result[0].friends.map((i) => ({ ...i, relation: UserRelation.Friend })),
      totalCount: result[1].friends.length,
    };
  else throw createHttpError(404, 'user not found');
};

export const addFriend = async (authUserId: string, userId: string): Promise<void> => {
  await Promise.all([
    UserModel.findByIdAndUpdate(authUserId, {
      $push: { friends: userId },
      $pull: { subscribers: userId },
    }),
    UserModel.findByIdAndUpdate(userId, {
      $push: { friends: authUserId },
      $pull: { subscriptions: authUserId },
    }),
  ]);
};

export const deleteFriend = async (authUserId: string, userId: string): Promise<void> => {
  await Promise.all([
    UserModel.findByIdAndUpdate(authUserId, {
      $push: { subscribers: userId },
      $pull: { friends: userId },
    }),
    UserModel.findByIdAndUpdate(userId, {
      $push: { subscriptions: authUserId },
      $pull: { friends: authUserId },
    }),
  ]);
};

export const addSubscription = async (authUserId: string, userId: string): Promise<void> => {
  await Promise.all([
    UserModel.findByIdAndUpdate(authUserId, { $push: { subscriptions: userId } }),
    UserModel.findByIdAndUpdate(userId, { $push: { subscribers: authUserId } }),
  ]);
};

export const deleteSubscription = async (authUserId: string, userId: string): Promise<void> => {
  await Promise.all([
    UserModel.findByIdAndUpdate(authUserId, { $pull: { subscriptions: userId } }),
    UserModel.findByIdAndUpdate(userId, { $pull: { subscribers: authUserId } }),
  ]);
};
