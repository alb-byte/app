import { NotFoundError } from '../exception/httpError';
import { PostModel } from '../models/entities/Post';
import { IUser } from '../models/interfaces';
import { FeedModel, UserModel } from '../models/entities';
import { CreatePostRequestDto, GetUserPostsQuery, UpdatePostRequestDto } from '../dto/post';
import { ItemListResponseDto, PostResponseDto } from '../dto';
import { Types } from 'mongoose';
const PAGE_SIZE = 5;

export const getMany = async (
  authUserId: string,
  query: GetUserPostsQuery,
): Promise<ItemListResponseDto<PostResponseDto>> => {
  const page = query.page || 1;
  const results = await Promise.all([
    PostModel.find({ user: query.userId })
      .sort({ _id: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * (page - 1))
      .populate<Pick<PostResponseDto, 'user'>>('user', {
        _id: true,
        firstName: true,
        lastName: true,
        avatar: true,
      })
      .lean(),
    PostModel.countDocuments({ user: query.userId }),
  ]);

  return {
    totalCount: results[1],
    items: results[0].map((i) => ({
      ...i,
      _id: i._id.toString(),
      likes: i.likes.length,
      comments: i.comments.length,
      isLiked: i.likes.map((i) => i.toString()).includes(authUserId),
    })),
  };
};
export const getOne = async (authUserId: string, postId: string): Promise<PostResponseDto> => {
  const post = await PostModel.findById(postId)
    .populate<Pick<PostResponseDto, 'user'>>('user', {
      _id: true,
      firstName: true,
      lastName: true,
      avatar: true,
    })
    .lean();
  if (!post) throw new NotFoundError('Post not found');
  return {
    ...post,
    _id: post._id.toString(),
    likes: post.likes.length,
    comments: post.comments.length,
    isLiked: post.likes.map((i) => i.toString()).includes(authUserId),
  };
};
export const create = async (
  authUserId: string,
  dto: CreatePostRequestDto,
): Promise<PostResponseDto> => {
  const authUser = await UserModel.findById<
    Pick<IUser, 'firstName' | 'lastName' | 'avatar' | 'friends' | 'subscribers'> & {
      _id: Types.ObjectId;
    }
  >(authUserId, {
    _id: true,
    firstName: true,
    lastName: true,
    avatar: true,
    friends: true,
    subscribers: true,
  }).lean();
  if (authUser) {
    const post = await PostModel.create({ ...dto, user: authUserId });
    const { friends, subscribers, ...author } = authUser;
    const { likes, comments, user, ...postData } = post.toObject();
    const feedItems = [...authUser.friends, ...authUser.subscribers, authUser._id].map(
      (i) => new FeedModel({ user: i, post: post.id }),
    );
    await FeedModel.insertMany(feedItems);
    return {
      ...postData,
      _id: postData._id.toString(),
      user: { ...author, _id: authUserId },
      likes: 0,
      comments: 0,
      isLiked: false,
    };
  } else throw new NotFoundError('Post not found');
};
export const update = async (
  authUserId: string,
  postId: string,
  dto: UpdatePostRequestDto,
): Promise<void> => {
  await PostModel.findByIdAndUpdate(postId, dto);
};
export const remove = async (authUserId: string, postId: string): Promise<void> => {
  await Promise.all([PostModel.findByIdAndDelete(postId), FeedModel.deleteMany({ post: postId })]);
};
