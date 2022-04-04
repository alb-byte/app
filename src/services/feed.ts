import { FeedModel } from '../models/models';
import { ItemList } from '../newLib/dto';
const PAGE_SIZE = 10;
export const getMany = async (authUserId: string, page: number): Promise<ItemList<any>> => {
  const posts = await FeedModel.find({ userId: authUserId }, { postId: 1 })
    .populate<{
      postId: Array<{
        _id: string;
        userId: string;
        title: string;
        body: string;
        image: string;
      }>;
    }>({
      path: 'postId',
      select: '_id image body title userId',
      options: {
        limit: PAGE_SIZE,
        sort: { createdAt: 1 },
        skip: (page - 1) * PAGE_SIZE,
      },
    })
    .lean();
  const totalCount = await FeedModel.countDocuments({ userId: authUserId });
  return {
    items: posts.map((post) => post.postId),
    totalCount,
  };
};
