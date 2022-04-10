import { Schema, model } from 'mongoose';
import { IConfirmSession } from '../interfaces';
const ConfirmSessionSchema = new Schema<IConfirmSession>(
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
export const ConfirmSessionModel = model<IConfirmSession>('ConfirmSession', ConfirmSessionSchema);
