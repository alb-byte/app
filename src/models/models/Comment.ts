import { Schema, model } from 'mongoose';
import { IComment } from '../interfaces';
const CommentSchema = new Schema<IComment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    body: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { versionKey: false },
);
export const CommentModel = model<IComment>('Comment', CommentSchema);
