import { Sex, UserType } from '../../enums';
import { UserRelation } from '../../enums/UserRelation';
import { DoctorInfoDto } from './DoctorInfoDto';
import { PacientInfoDto } from './PacientInfoDto';

export interface UserResponseDto {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  sex: Sex;
  userType: UserType;
  aboutMe: string | null;
  avatar: string | null;
  isBlocked: boolean;
  userInfo: DoctorInfoDto | PacientInfoDto | null;
  relation: UserRelation;
  showInfo?: boolean;
  isAproved?: boolean;

  createdAt: number;
  updatedAt: number;
}
