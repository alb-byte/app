import { Schema, model } from 'mongoose';
import { ISpeciality } from '../interfaces';
const SpecialitySchema = new Schema<ISpeciality>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { versionKey: false },
);
export const SpecialityModel = model<ISpeciality>('Speciality', SpecialitySchema);
