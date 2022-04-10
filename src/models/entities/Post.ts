import { Schema, model } from 'mongoose';
import { IPost } from '../interfaces';
const PostSchema = new Schema<IPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    body: {
      type: Schema.Types.String,
      required: true,
    },
    image: {
      type: Schema.Types.String,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { versionKey: false, timestamps: true },
);
export const PostModel = model<IPost>('Post', PostSchema);
