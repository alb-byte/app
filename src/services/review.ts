import { ReviewModel } from '../models/models';
import { ItemList } from '../newLib/dto';
const PAGE_SIZE = 5;

export const getOneReview = async (
  authUserId: string,
  userId: string,
  reviewId: string,
): Promise<any> => {
  return ReviewModel.findById(reviewId);
};
export const getManyReview = async (
  authUserId: string,
  userId: string,
  page: number,
): Promise<ItemList<any>> => {
  const review = await ReviewModel.find(
    { doctorId: userId },
    {},
    { skip: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE, sort: 'createdAt' },
  );
  const totalCount = await ReviewModel.countDocuments({ doctorId: userId });
  return {
    items: review,
    totalCount,
  };
};
export const addReview = async (authUserId: string, userId: string, body: string): Promise<any> => {
  return ReviewModel.create({ userId: authUserId, doctorId: userId, body });
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
