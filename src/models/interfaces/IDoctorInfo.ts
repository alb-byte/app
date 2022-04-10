import { Types } from 'mongoose';
import { AcademicDegree, DoctorCategory, DoctorType } from '../../enums';

export interface IDoctorInfo {
  userId: Types.ObjectId;
  address?: string;
  firstSpeciality: Types.ObjectId;
  secondSpeciality: Types.ObjectId;
  academicDegree: AcademicDegree;
  category: DoctorCategory;
  type: DoctorType;
  university: Types.ObjectId;
  universityGraduationYear: number;
}
