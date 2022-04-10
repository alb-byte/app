export interface CommentResponseDto {
  _id: string;
  post: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
}
