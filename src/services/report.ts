import { ReportModel } from '../models/models';
import { ItemList } from '../newLib/dto';
const PAGE_SIZE = 5;

export const getOneReport = async (
  authUserId: string,
  userId: string,
  reportId: string,
): Promise<any> => {
  return ReportModel.findById(reportId);
};
export const getManyReport = async (
  authUserId: string,
  userId: string,
  page: number,
): Promise<ItemList<any>> => {
  const reports = await ReportModel.find(
    {},
    {},
    { skip: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE, sort: 'createdAt' },
  );
  const totalCount = await ReportModel.countDocuments({});
  return {
    items: reports,
    totalCount,
  };
};
export const addReport = async (
  authUserId: string,
  userId: string,
  reportDto: { body: string; isChecked: boolean },
): Promise<any> => {
  return ReportModel.create({ userId: authUserId, doctorId: userId, ...reportDto });
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
