import { Types } from 'mongoose';

export interface IComment {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  body: string;
  createdAt: number;
  updatedAt: number;
}
