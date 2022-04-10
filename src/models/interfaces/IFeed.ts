import { Types } from 'mongoose';

export interface IFeed {
  user: Types.ObjectId;
  post: Types.ObjectId;
}
