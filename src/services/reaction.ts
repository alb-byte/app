import { PostModel } from '../models/models/Post';
import { Types } from 'mongoose';

export const create = async (authUserId: string, postId: string): Promise<void> => {
  const userId = new Types.ObjectId(authUserId);
  await PostModel.findByIdAndUpdate(postId, [
    {
      $set: {
        likes: {
          $cond: {
            if: { $in: [userId, '$likes'] },
            then: '$likes',
            else: { $concatArrays: ['$likes', [userId]] },
          },
        },
      },
    },
  ]);
};
export const remove = async (authUserId: string, postId: string): Promise<void> => {
  await PostModel.findByIdAndUpdate(postId, { $pull: { likes: authUserId } });
};
