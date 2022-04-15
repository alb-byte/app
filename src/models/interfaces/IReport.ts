import { Types } from 'mongoose';

export interface IReport {
  sender: Types.ObjectId;
  user: Types.ObjectId;
  body: string;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
