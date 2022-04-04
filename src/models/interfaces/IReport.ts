import { Types } from 'mongoose';

export interface IReport {
  doctorId: Types.ObjectId;
  userId: Types.ObjectId;
  body: string;
  isChecked: boolean;
}
