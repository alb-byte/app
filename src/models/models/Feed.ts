import { Schema, model } from 'mongoose';
import { IFeed } from '../interfaces';
const FeedSchema = new Schema<IFeed>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { versionKey: false },
);
export const FeedModel = model<IFeed>('Feed', FeedSchema);
