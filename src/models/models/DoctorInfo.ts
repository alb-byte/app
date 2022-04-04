import { Schema, model } from 'mongoose';
import { AcademicDegree, DoctorCategory, DoctorType } from '../../newLib/enums';
import { IDoctorInfo } from '../interfaces';
const DoctorInfoSchema = new Schema<IDoctorInfo>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address: {
      type: Schema.Types.String,
    },
    firstSpeciality: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    secondSpeciality: {
      type: Schema.Types.ObjectId,
    },
    academicDegree: {
      type: Schema.Types.Number,
      enum: AcademicDegree,
    },
    category: {
      type: Schema.Types.Number,
      enum: DoctorCategory,
      required: true,
    },
    type: {
      type: Schema.Types.Number,
      enum: DoctorType,
      required: true,
    },
    university: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    universityGraduationYear: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  { versionKey: false },
);
export const DoctorInfoModel = model<IDoctorInfo>('DoctorInfo', DoctorInfoSchema);
