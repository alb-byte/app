import { IUniversity } from '../models/interfaces';
import { UniversityModel } from '../models/entities';
import { ItemListResponseDto } from '../dto';
const PAGE_SIZE = 10;
export const getMany = async (page: number = 1): Promise<ItemListResponseDto<IUniversity>> => {
  const universityData = await Promise.all([
    UniversityModel.find({})
      .sort({ name: 1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    UniversityModel.countDocuments({}),
  ]);
  return {
    items: universityData[0],
    totalCount: universityData[1],
  };
};
export const getOne = async (id: string): Promise<IUniversity | null> => {
  const university = await UniversityModel.findById(id).lean();
  return university;
};
export const create = async (name: string): Promise<any> => {
  return UniversityModel.create({ name });
};
export const update = async (universityId: string, name: string): Promise<void> => {
  await UniversityModel.findByIdAndUpdate(universityId, { name });
};
export const remove = async (universityId: string): Promise<void> => {
  await UniversityModel.findByIdAndDelete(universityId);
};
