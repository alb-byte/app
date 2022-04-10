import { Schema, model } from 'mongoose';
import { IFeed } from '../interfaces';
const FeedSchema = new Schema<IFeed>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { versionKey: false },
);
export const FeedModel = model<IFeed>('Feed', FeedSchema);
