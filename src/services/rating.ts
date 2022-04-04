import { RatingModel } from '../models/models';

export const addRating = async (
  authUserId: string,
  userId: string,
  score: number,
): Promise<void> => {
  await RatingModel.create({
    doctorId: userId,
    userId: authUserId,
    score,
  });
};
export const removeRating = async (authUserId: string, userId: string): Promise<void> => {
  await RatingModel.findOneAndDelete({
    doctorId: userId,
    userId: authUserId,
  });
};
