import { RatingModel } from '../models/entities';

export const update = async (authUserId: string, userId: string, score: number): Promise<void> => {
  await RatingModel.findOneAndUpdate(
    {
      doctorId: userId,
      userId: authUserId,
    },
    {
      doctorId: userId,
      userId: authUserId,
      score,
    },
    { upsert: true },
  );
};
export const remove = async (authUserId: string, userId: string): Promise<void> => {
  await RatingModel.findOneAndDelete({
    doctorId: userId,
    userId: authUserId,
  });
};
