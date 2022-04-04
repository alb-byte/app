import { ISpeciality } from '../models/interfaces';
import { SpecialityModel } from '../models/models';

export const getMany = async (): Promise<Array<ISpeciality> | null> => {
  const specialities = await SpecialityModel.find({}).lean();
  return specialities;
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
