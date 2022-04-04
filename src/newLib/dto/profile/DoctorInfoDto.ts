import { AcademicDegree, DoctorCategory, DoctorType } from '../../enums';

export interface DoctorInfoDto {
  address?: string;
  firstSpeciality: string;
  secondSpeciality: string;
  academicDegree: AcademicDegree;
  category: DoctorCategory;
  type: DoctorType;
  university: string;
  universityGraduationYear: number;
}
