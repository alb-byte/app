import { Types } from 'mongoose';

export interface IDialog {
  _id: Types.ObjectId;
  users: Array<Types.ObjectId>;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
}
