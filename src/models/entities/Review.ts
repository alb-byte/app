import { Schema, model } from 'mongoose';
import { IReview } from '../interfaces';
const ReviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);
export const ReviewModel = model<IReview>('Review', ReviewSchema);
