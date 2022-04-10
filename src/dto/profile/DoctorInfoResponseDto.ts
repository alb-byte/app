import { DoctorInfoDto } from './DoctorInfoDto';

export interface DoctorInfoResponseDto extends DoctorInfoDto {
  totalReviewCount: number;
  totalRatingCount: number;
  myRating: number | null;
  avgRating: number;
}
