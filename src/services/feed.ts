import { FeedModel } from '../models/entities';
import { ItemListResponseDto, PostResponseDto } from '../dto';
import { Types } from 'mongoose';
const PAGE_SIZE = 10;
export const getMany = async (
  authUserId: string,
  page: number,
): Promise<ItemListResponseDto<PostResponseDto>> => {
  const posts = await FeedModel.find({ user: authUserId }, { _id: false, user: false })
    .populate<{
      post: {
        _id: Types.ObjectId;
        title: string;
        body: string;
        image: string;
        likes: Array<Types.ObjectId>;
        comments: Array<Types.ObjectId>;
        createdAt: Date;
        updatedAt: Date;
        user: { _id: Types.ObjectId; firstName: string; lastName: string; avatar: string | null };
      };
    }>({
      path: 'post',
      options: {
        limit: PAGE_SIZE,
        sort: { createdAt: -1 },
        skip: (page - 1) * PAGE_SIZE,
      },
      populate: { path: 'user', select: '_id firstName lastName avatar' },
    })
    .lean();
  const totalCount = await FeedModel.countDocuments({ userId: authUserId });
  return {
    items: posts.map((i) => {
      return {
        ...i.post,
        _id: i.post._id.toString(),
        likes: i.post.likes.length,
        comments: i.post.comments.length,
        isLiked: i.post.likes.map((i) => i.toString()).includes(authUserId),
        user: {
          ...i.post.user,
          _id: i.post.user._id.toString(),
        },
      };
    }),
    totalCount,
  };
};
