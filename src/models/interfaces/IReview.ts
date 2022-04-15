import { Types } from 'mongoose';

export interface IReview {
  doctor: Types.ObjectId;
  user: Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
