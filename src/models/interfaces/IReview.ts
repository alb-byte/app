import { Types } from 'mongoose';

export interface IReview {
  doctorId: Types.ObjectId;
  userId: Types.ObjectId;
  body: string;
}
