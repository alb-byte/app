export interface ReviewResponseDto {
  _id: string;
  doctor: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
