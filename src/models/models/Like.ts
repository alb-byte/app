import { Schema, model } from 'mongoose';
import { ILike } from '../interfaces';
const LikeSchema = new Schema<ILike>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { versionKey: false },
);
export const LikeModel = model<ILike>('Like', LikeSchema);
