import { ReportModel, UserModel } from '../models/entities';
import { CreateReportRequestDto, ItemListResponseDto } from '../dto';
import { ReportResponseDto } from '../dto/report/ReportResponseDto';
import { NotFoundError } from '../exception/httpError';
import { IUser } from '../models/interfaces';
import { Types } from 'mongoose';
const PAGE_SIZE = 5;

export const getOneReport = async (
  authUserId: string,
  userId: string,
  reportId: string,
): Promise<ReportResponseDto> => {
  const report = await ReportModel.findById(reportId)
    .populate<Pick<ReportResponseDto, 'sender'>>('sender', {
      _id: true,
      firstName: true,
      lastName: true,
      avatar: true,
    })
    .populate<Pick<ReportResponseDto, 'user'>>('user', {
      _id: true,
      firstName: true,
      lastName: true,
      avatar: true,
    })
    .lean();
  if (!report) throw new NotFoundError('Post not found');
  return {
    ...report,
    _id: report._id.toString(),
  };
};
export const getManyReports = async (
  authUserId: string,
  page: number,
): Promise<ItemListResponseDto<ReportResponseDto>> => {
  const reports = await ReportModel.find(
    {},
    {},
    { skip: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE, sort: { _id: -1 } },
  )
    .populate<Pick<ReportResponseDto, 'user'>>('user', {
      _id: true,
      firstName: true,
      lastName: true,
      avatar: true,
    })
    .populate<Pick<ReportResponseDto, 'sender'>>('sender', {
      _id: true,
      firstName: true,
      lastName: true,
      avatar: true,
    })
    .lean();
  const totalCount = await ReportModel.countDocuments();
  return {
    items: reports.map((report) => ({
      ...report,
      _id: report._id.toString(),
    })),
    totalCount,
  };
};
export const addReport = async (
  authUserId: string,
  reportDto: CreateReportRequestDto,
): Promise<ReportResponseDto> => {
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
  const doc = await UserModel.findById<
    Pick<IUser, 'firstName' | 'lastName' | 'avatar'> & {
      _id: Types.ObjectId;
    }
  >(authUserId, {
    _id: true,
    firstName: true,
    lastName: true,
    avatar: true,
  }).lean();
  const report = await ReportModel.create({
    sender: authUserId,
    user: reportDto.userId,
    body: reportDto.body,
    isChecked: false,
  });
  if (authUser && doc) {
    return {
      ...report.toObject(),
      sender: { ...authUser, _id: authUser._id.toString() },
      user: { ...doc, _id: doc._id.toString() },
      _id: report._id.toString(),
    };
  }
  throw new NotFoundError('Post not found');
};
export const updateReport = async (
  authUserId: string,
  reportId: string,
  reportDto: { body: string; isChecked: boolean },
): Promise<void> => {
  await ReportModel.findByIdAndUpdate(reportId, { ...reportDto });
};
export const removeReport = async (authUserId: string, reportId: string): Promise<void> => {
  await ReportModel.findByIdAndDelete(reportId);
};
