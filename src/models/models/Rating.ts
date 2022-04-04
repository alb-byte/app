import { Schema, model } from 'mongoose';
import { IRating } from '../interfaces';
const RatingSchema = new Schema<IRating>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  { versionKey: false },
);
export const RatingModel = model<IRating>('Rating', RatingSchema);
