import { AcademicDegree, DoctorCategory, DoctorType, Sex } from '../../enums'

export interface SearchDoctorRequestDto {
  fullName?: string;
  speciality?: string;
  academicDegree?: AcademicDegree;
  category?: DoctorCategory;
  type?: DoctorType;
  university?: string;
  universityGraduationYear?: number;
  sex?: Sex;
}
