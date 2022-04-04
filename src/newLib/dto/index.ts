import { GetManyDto as GetManyCommentsDto } from './comment/GetManyDto';
import { GetOneDto as GetOneCommentDto } from './comment/GetOneDto';
import { CreateDto as CreateCommentDto } from './comment/CreateDto';
import { UpdateDto as UpdateCommentDto } from './comment/UpdateDto';
import { RemoveDto as RemoveCommentDto } from './comment/RemoveDto';
import { GetManyDto as GetFeedCommentDto } from './feed/GetManyDto';
import { GetOneDto as GetOnePostDto } from './profile/GetOneDto';
import { UserIdDto } from './general/UserIdDto';
import { PostIdDto } from './general/PostIdDto';
import { PageDto } from './general/PageDto';
import { ScoreDto as ScoreRatingDto } from './rating/ScoreDto';
import { ReportParamsDto } from './report/ReportParamsDto';
import { ReportBodyDto } from './report/ReportBodyDto';
import { ReviewBodyDto } from './review/ReviewBodyDto';
import { ReviewParamsDto } from './review/ReviewParamsDto';
import { SpecialityParamsDto } from './speciality/SpecialityParamsDto';
import { SpecialityBodyDto } from './speciality/SpecialityBodyDto';
import { UniversityParamsDto } from './university/UniversityParamsDto';
import { UniversityBodyDto } from './university/UniversityBodyDto';

export {
  GetManyCommentsDto,
  GetOneCommentDto,
  CreateCommentDto,
  UpdateCommentDto,
  RemoveCommentDto,
  GetFeedCommentDto,
  GetOnePostDto,
  UserIdDto,
  ScoreRatingDto,
  PostIdDto,
  PageDto,
  ReportParamsDto,
  ReportBodyDto,
  ReviewBodyDto,
  ReviewParamsDto,
  SpecialityParamsDto,
  SpecialityBodyDto,
  UniversityParamsDto,
  UniversityBodyDto,
};

export interface ItemList<T> {
  totalCount: number;
  items: Array<T>;
}
