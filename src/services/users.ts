import createHttpError from 'http-errors';
import { UserModel } from '../models/entities';
import { ItemListResponseDto } from '../dto';
import { UserPreviewResponseDto } from '../dto/user/UserPreviewResponseDto';
import { UserType } from '../enums';
const PAGE_SIZE = 20;

export const getUnApprovedUsers = async (
  authUserId: string,
  page: number,
): Promise<ItemListResponseDto<UserPreviewResponseDto>> => {
  const result = await Promise.all([
    UserModel.find(
      {
        isAproved: false,
        userType: UserType.DOCTOR,
      },
      {
        _id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        userType: true,
        sex: true,
      },
    )
      .limit(PAGE_SIZE)
      .sort({ updatedAt: 1 })
      .skip((page - 1) * PAGE_SIZE)
      .lean() as any,
    UserModel.countDocuments({
      isAproved: false,
      userType: UserType.DOCTOR,
    }),
  ]);
  if (result[0] && result[1])
    return {
      items: result[0],
      totalCount: result[1],
    };
  else throw createHttpError(404, 'user not found');
};

export const approveUser = async (authUserId: string, userId: string): Promise<void> => {
  await UserModel.findByIdAndUpdate(userId, { $set: { isAproved: true } });
};
export const blockUser = async (authUserId: string, userId: string): Promise<void> => {
  await UserModel.findByIdAndUpdate(userId, { $set: { isBlocked: true } });
};
