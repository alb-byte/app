import { GetManyDto as GetManyCommentsDto } from './comment/GetManyDto';
import { GetOneDto as GetOneCommentDto } from './comment/GetOneDto';
import { CreateDto as CreateCommentDto } from './comment/CreateDto';
import { UpdateDto as UpdateCommentDto } from './comment/UpdateDto';
import { RemoveDto as RemoveCommentDto } from './comment/RemoveDto';

export {
  GetManyCommentsDto,
  GetOneCommentDto,
  CreateCommentDto,
  UpdateCommentDto,
  RemoveCommentDto,
};

export interface ItemList<T> {
  totalCount: number;
  items: Array<T>;
}
