import { NotFoundError } from '../exception/httpError';
import { IUser } from '../models/interfaces';
import { CommentModel, UserModel } from '../models/entities';
import { ItemListResponseDto } from '../dto';
import { CommentResponseDto } from '../dto/comment/CommentResponseDto';
import { CreateCommentRequestDto } from '../dto/comment/CreateCommentRequestDto';
import { Types } from 'mongoose';
import { PostModel } from '../models/entities/Post';

const PAGE_SIZE = 5;

export const getOne = async (commentId: string): Promise<CommentResponseDto> => {
  const comment = await CommentModel.findById(commentId)
    .populate<Pick<CommentResponseDto, 'user'>>('user', {
      _id: true,
      firstName: true,
      lastName: true,
      avatar: true,
    })
    .lean();
  if (!comment) throw new NotFoundError('Post not found');
  return {
    ...comment,
    _id: comment._id.toString(),
    post: comment.post.toString(),
  };
};
export const getMany = async (
  postId: string,
  page: number,
): Promise<ItemListResponseDto<CommentResponseDto>> => {
  const comments = await CommentModel.find(
    { post: postId },
    {},
    { skip: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE, sort: { _id: -1 } },
  )
    .populate<Pick<CommentResponseDto, 'user'>>('user', {
      _id: true,
      firstName: true,
      lastName: true,
      avatar: true,
    })
    .lean();
  const totalCount = await CommentModel.countDocuments({ post: postId });
  return {
    items: comments.map((comment) => ({
      ...comment,
      _id: comment._id.toString(),
      post: comment.post.toString(),
    })),
    totalCount,
  };
};
export const create = async (
  authUserId: string,
  postId: string,
  dto: CreateCommentRequestDto,
): Promise<CommentResponseDto> => {
  const authUser = await UserModel.findById<
    Pick<IUser, 'firstName' | 'lastName' | 'avatar'> & {
      _id: Types.ObjectId;
    }
  >(authUserId, {
    _id: true,
    firstName: true,
    lastName: true,
    avatar: true,
  }).lean();
  const comment = await CommentModel.create({ post: postId, user: authUserId, body: dto.body });
  await PostModel.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
  if (authUser) {
    return {
      ...comment.toObject(),
      user: { ...authUser, _id: authUser._id.toString() },
      _id: comment._id.toString(),
      post: comment.post.toString(),
    };
  }
  throw new NotFoundError('Post not found');
};
export const update = async (
  authpostId: string,
  commentId: string,
  dto: CreateCommentRequestDto,
): Promise<void> => {
  await CommentModel.findByIdAndUpdate(commentId, { body: dto.body });
};
export const remove = async (
  authUserId: string,
  postId: string,
  commentId: string,
): Promise<void> => {
  await Promise.all([
    CommentModel.findByIdAndDelete(commentId),
    PostModel.findByIdAndUpdate(postId, { $pull: { comments: new Types.ObjectId(commentId) } }),
  ]);
};
