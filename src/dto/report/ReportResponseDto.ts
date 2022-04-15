export interface ReportResponseDto {
  _id: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
  body: string;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
