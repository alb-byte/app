import { Types } from 'mongoose';

export interface IPost {
  user: Types.ObjectId;
  title: string;
  body: string;
  image: string;
  likes: Array<Types.ObjectId>;
  comments: Array<Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}
