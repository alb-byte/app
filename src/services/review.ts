import { ReviewModel, UserModel } from '../models/entities';
import { ItemListResponseDto } from '../dto';
import { ReviewResponseDto } from '../dto/review/ReviewResponseDto';
import { NotFoundError } from '../exception/httpError';
import { IUser } from '../models/interfaces';
import { Types } from 'mongoose';

const PAGE_SIZE = 5;

export const getOneReview = async (
  authUserId: string,
  userId: string,
  reviewId: string,
): Promise<ReviewResponseDto> => {
  const review = await ReviewModel.findById(reviewId)
    .populate<Pick<ReviewResponseDto, 'user'>>('user', {
      _id: true,
      firstName: true,
      lastName: true,
      avatar: true,
    })
    .lean();
  if (!review) throw new NotFoundError('Post not found');
  return {
    ...review,
    _id: review._id.toString(),
    doctor: review.doctor.toString(),
  };
};
export const getManyReview = async (
  authUserId: string,
  userId: string,
  page: number,
): Promise<ItemListResponseDto<ReviewResponseDto>> => {
  const reviews = await ReviewModel.find(
    { doctor: userId },
    {},
    { skip: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE, sort: 'createdAt' },
  )
    .populate<Pick<ReviewResponseDto, 'user'>>('user', {
      _id: true,
      firstName: true,
      lastName: true,
      avatar: true,
    })
    .lean();
  const totalCount = await ReviewModel.countDocuments({ doctor: userId });
  return {
    items: reviews.map((review) => ({
      ...review,
      _id: review._id.toString(),
      doctor: review.doctor.toString(),
    })),
    totalCount,
  };
};
export const addReview = async (
  authUserId: string,
  userId: string,
  body: string,
): Promise<ReviewResponseDto> => {
  const authUser = await UserModel.findById<
    Pick<IUser, 'firstName' | 'lastName' | 'avatar'> & {
      _id: Types.ObjectId;
    }
  >(authUserId, {
    _id: true,
    firstName: true,
    lastName: true,
    avatar: true,
  }).lean();
  const review = await ReviewModel.create({ user: authUserId, doctor: userId, body });
  if (authUser) {
    return {
      ...review.toObject(),
      user: { ...authUser, _id: authUser._id.toString() },
      _id: review._id.toString(),
      doctor: review.doctor.toString(),
    };
  }
  throw new NotFoundError('Post not found');
};
export const updateReview = async (
  authUserId: string,
  reviewId: string,
  body: string,
): Promise<void> => {
  await ReviewModel.findByIdAndUpdate(reviewId, { body });
};
export const removeReview = async (authUserId: string, reviewId: string): Promise<void> => {
  await ReviewModel.findByIdAndDelete(reviewId);
};
