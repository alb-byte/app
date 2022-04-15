import { Types } from 'mongoose';

export interface IMessage {
  _id: Types.ObjectId;
  dialog: Types.ObjectId;
  user: Types.ObjectId;
  body: string;
  isRead: boolean;
  media: Array<string>;
  createdAt: number;
}
