import { Schema, model } from 'mongoose';
import { Sex, UserType } from '../../enums';
import { IUser } from '../interfaces';

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: Schema.Types.String,
      index: {
        unique: true,
      },
      lowercase: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    sex: {
      type: Schema.Types.Number,
      enum: Sex,
      required: true,
    },
    userType: {
      type: Schema.Types.Number,
      enum: UserType,
      required: true,
    },
    userInfo: {
      type: Schema.Types.ObjectId,
    },
    aboutMe: {
      type: Schema.Types.String,
    },
    showInfo: {
      type: Schema.Types.Boolean,
    },
    isVerified: {
      type: Schema.Types.Boolean,
      required: true,
    },
    isAproved: {
      type: Schema.Types.Boolean,
    },
    isBlocked: {
      type: Schema.Types.Boolean,
      required: true,
    },
    avatar: {
      type: Schema.Types.String,
    },

    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    subscribers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    subscriptions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    refreshSessions: [{ type: Schema.Types.ObjectId, ref: 'RefreshSession' }],
    confirmSessions: [{ type: Schema.Types.ObjectId, ref: 'ConfirmSession' }],
  },
  { versionKey: false },
);
export const UserModel = model<IUser>('User', UserSchema);
