import { AcademicDegree, DoctorCategory, DoctorType, Sex, UserType } from '../../enums';

export interface RegistrationRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  sex: Sex;
  userType: UserType;
  doctorInfo?: {
    address?: string;
    firstSpeciality: string;
    secondSpeciality?: string;
    academicDegree: AcademicDegree;
    category: DoctorCategory;
    type: DoctorType;
    university: string;
    universityGraduationYear: number;
  };
}
