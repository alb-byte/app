import { Types } from 'mongoose';

export interface IFeed {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
}
