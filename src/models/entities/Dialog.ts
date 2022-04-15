import { Schema, Types, model } from 'mongoose';
import { IDialog } from '../interfaces/IDialog';

const DialogSchema = new Schema<IDialog>(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tag: {
      type: Schema.Types.String,
    },
  },
  { versionKey: false, timestamps: true },
);
export const DialogModel = model<IDialog>('Dialog', DialogSchema);
