import { IUniversity } from '../models/interfaces';
import { UniversityModel } from '../models/models';

export const getMany = async (): Promise<Array<IUniversity> | null> => {
  const universities = await UniversityModel.find({}).lean();
  return universities;
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
