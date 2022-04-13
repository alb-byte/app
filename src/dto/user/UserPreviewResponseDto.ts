import { Sex, UserType } from '../../enums';
import { UserRelation } from '../../enums/UserRelation';

export interface UserPreviewResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  userType: UserType;
  sex: Sex;
  relation: UserRelation;
}
