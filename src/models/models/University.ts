import { Schema, model } from 'mongoose';
import { IUniversity } from '../interfaces';
const UniversitySchema = new Schema<IUniversity>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { versionKey: false },
);
export const UniversityModel = model<IUniversity>('University', UniversitySchema);
