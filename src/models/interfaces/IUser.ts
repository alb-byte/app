import { Types } from 'mongoose';
import { Sex, UserType } from '../../enums';

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  sex: Sex;
  userType: UserType;
  aboutMe: string | null;
  avatar: string | null;
  showInfo: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  isAproved: boolean;
  userInfo?: Types.ObjectId;
  createdAt: number;
  updatedAt: number;

  friends: Types.Array<Types.ObjectId>;
  subscribers: Types.Array<Types.ObjectId>;
  subscriptions: Types.Array<Types.ObjectId>;
  refreshSessions: Types.Array<Types.ObjectId>;
  confirmSessions: Types.Array<Types.ObjectId>;
}
