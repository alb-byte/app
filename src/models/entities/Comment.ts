import { Schema, model } from 'mongoose';
import { IComment } from '../interfaces';
const CommentSchema = new Schema<IComment>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    body: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);
export const CommentModel = model<IComment>('Comment', CommentSchema);
