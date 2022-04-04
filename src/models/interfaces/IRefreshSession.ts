import { Types } from 'mongoose';

export interface IRefreshSession {
  token: string;
  userId: Types.ObjectId;
  expiresIn: number;
}
