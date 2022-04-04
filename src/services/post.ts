import GetUserPostsDto from '../models/request/post/GetUserPostsDto';
import UpdatePostDto from '../models/request/post/UpdatePostDto';
import CreatePostDto from '../models/request/post/CreatePostDto';
import { AuthorizationError, NotFoundError } from '../models/exception/httpError';
import { PostModel } from '../models/models/Post';
import { IPost } from '../models/interfaces';
import { FeedModel, UserModel } from '../models/models';
const PAGE_SIZE = 5;
interface PostListResponse {
  totalCount: number;
  posts: Array<IPost>;
}
export const getMany = async (dto: GetUserPostsDto): Promise<PostListResponse> => {
  const page = parseInt(dto.page) || 1;
  const posts = await PostModel.find({ userId: dto.userId })
    .sort({ _id: -1 })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * (page - 1))
    .lean();
  const totalCount = await PostModel.countDocuments({ userId: dto.userId });
  return { totalCount, posts };
};
export const getOne = async (id: string): Promise<IPost | null> => {
  const post = await PostModel.findById(id).lean();
  return post;
};
export const create = async (authUserId: string, dto: CreatePostDto): Promise<IPost> => {
  const post = new PostModel({ ...dto, userId: authUserId });
  const user = await UserModel.findById(authUserId, { friends: 1, subscribers: 1 }).lean();
  if (user) {
    const feedItems = [...user.friends, ...user.subscribers].map(
      (i) => new FeedModel({ userId: i, postId: post.id }),
    );
    await FeedModel.insertMany(feedItems);
  }
  await post.save();
  return post;
};
export const update = async (authUserId: string, dto: UpdatePostDto): Promise<IPost | null> => {
  const { _id, ...newPostData } = dto;
  const postInDb = await PostModel.findById(_id, { userId: true });
  if (!postInDb) throw new NotFoundError('Post not found');
  if (postInDb.userId.toString() !== authUserId) throw new AuthorizationError('Error');
  else {
    const post = await PostModel.findByIdAndUpdate(_id, newPostData, { new: true }).lean();
    return post;
  }
};
export const remove = async (authUserId: string, id: string): Promise<IPost | null> => {
  const postInDb = await PostModel.findById(id, { userId: true });
  if (!postInDb) throw new NotFoundError('Post not found');
  if (postInDb.userId.toString() !== authUserId) throw new AuthorizationError('Error');
  else {
    const post = await PostModel.findByIdAndRemove(id, { new: true }).lean();
    return post;
  }
};
