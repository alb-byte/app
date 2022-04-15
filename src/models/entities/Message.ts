import { Schema, Types, model } from 'mongoose';
import { IMessage } from '../interfaces/IMessage';
const MessageSchema = new Schema<IMessage>(
  {
    dialog: { type: Schema.Types.ObjectId, ref: 'Dialog' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    body: {
      type: Schema.Types.String,
      maxlength: [1000, 'fd'],
    },
    isRead: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    media: [Schema.Types.String],
  },
  { versionKey: false, timestamps: true },
);
export const MessageModel = model<IMessage>('Message', MessageSchema);
