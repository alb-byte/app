import { CommentModel } from '../models/models';
import { ItemList } from '../newLib/dto';
const PAGE_SIZE = 5;

export const getOne = async (commentId: string): Promise<any> => {
  return CommentModel.findById(commentId);
};
export const getMany = async (postId: string, page: number): Promise<ItemList<any>> => {
  const comments = await CommentModel.find(
    { postId },
    {},
    { skip: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE, sort: 'createdAt' },
  );
  const totalCount = await CommentModel.countDocuments({ postId });
  return {
    items: comments,
    totalCount,
  };
};
export const create = async (authUserId: string, postId: string, body: string): Promise<any> => {
  return CommentModel.create({ postId, userId: authUserId, body });
};
export const update = async (
  authpostId: string,
  commentId: string,
  body: string,
): Promise<void> => {
  await CommentModel.findByIdAndUpdate(commentId, { body });
};
export const remove = async (authUserId: string, commentId: string): Promise<void> => {
  await CommentModel.findByIdAndDelete(commentId);
};
