import { ISpeciality } from '../models/interfaces';
import { SpecialityModel } from '../models/entities';
import { ItemListResponseDto } from '../dto';
const PAGE_SIZE = 10;

export const getMany = async (page: number = 1): Promise<ItemListResponseDto<ISpeciality>> => {
  const specialityData = await Promise.all([
    SpecialityModel.find({})
      .sort({ name: 1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    SpecialityModel.countDocuments({}),
  ]);
  return {
    items: specialityData[0],
    totalCount: specialityData[1],
  };
};
export const getOne = async (id: string): Promise<ISpeciality | null> => {
  const speciality = await SpecialityModel.findById(id).lean();
  return speciality;
};
export const create = async (name: string): Promise<any> => {
  return SpecialityModel.create({ name });
};
export const update = async (specialityId: string, name: string): Promise<void> => {
  await SpecialityModel.findByIdAndUpdate(specialityId, { name });
};
export const remove = async (specialityId: string): Promise<void> => {
  await SpecialityModel.findByIdAndDelete(specialityId);
};
