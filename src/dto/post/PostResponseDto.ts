export interface PostResponseDto {
  _id: string;
  title: string;
  body: string;
  image: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
}
