import { Schema, model } from 'mongoose';
import { IPost } from '../interfaces';
const PostSchema = new Schema<IPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
  },
  { versionKey: false },
);
export const PostModel = model<IPost>('Post', PostSchema);
