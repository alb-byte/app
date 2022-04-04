import { Schema, model } from 'mongoose';
import { IReview } from '../interfaces';
const ReviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { versionKey: false },
);
export const ReviewModel = model<IReview>('Review', ReviewSchema);
