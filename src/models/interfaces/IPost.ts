import { Types } from 'mongoose';

export interface IPost {
  userId: Types.ObjectId;
  title: string;
  body: string;
  image: string;
}
