import { Types } from 'mongoose';

export interface IConfirmSession {
  token: string;
  userId: Types.ObjectId;
  expiresIn: number;
}
