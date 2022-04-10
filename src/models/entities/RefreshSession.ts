import { Schema, model } from 'mongoose';
import { IRefreshSession } from '../interfaces';
const RefreshSessionSchema = new Schema<IRefreshSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: {
      type: Schema.Types.String,
      required: true,
    },
    expiresIn: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  { versionKey: false },
);
export const RefreshSessionModel = model<IRefreshSession>('RefreshSession', RefreshSessionSchema);
