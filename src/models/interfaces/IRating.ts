import { Types } from 'mongoose';

export interface IRating {
  doctorId: Types.ObjectId;
  userId: Types.ObjectId;
  score: number;
}
