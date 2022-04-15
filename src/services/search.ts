import _, { isEmpty } from 'lodash';
import { Types } from 'mongoose';
import { DoctorInfoModel, UserModel } from '../models/entities';
import { UserPreviewResponseDto } from '../dto/user/UserPreviewResponseDto';
import { ItemListResponseDto } from '../dto';
import { UserType } from '../enums';
import { SearchDoctorRequestDto } from '../dto/user/SearchDoctorRequestDto';
const PAGE_SIZE = 5;
export const searchUser = async (
  authUserId: string,
  dto: any,
): Promise<ItemListResponseDto<UserPreviewResponseDto>> => {
  const page = dto.page || 1;
  const termFilter = dto.fullName && {
    $expr: {
      $regexMatch: {
        input: { $concat: ['$firstName', ' ', '$lastName'] },
        regex: '.*' + dto.fullName + '.*',
        options: 'i',
      },
    },
  };
  const predicate = termFilter
    ? { $and: [termFilter, { _id: { $ne: authUserId } }] }
    : { _id: { $ne: authUserId } };
  const users = await UserModel.find<UserPreviewResponseDto>(predicate, {
    _id: 1,
    firstName: 1,
    lastName: 1,
    avatar: 1,
    userType: 1,
    sex: 1,
  })
    .sort({ firstName: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);
  const totalCount = await UserModel.countDocuments(predicate);
  return { items: users, totalCount };
};

export const searchDoctor = async (
  authUserId: string,
  dto: SearchDoctorRequestDto & { page: number },
): Promise<ItemListResponseDto<UserPreviewResponseDto>> => {
  const { page, fullName, sex, ...search } = dto;
  const pageNumber = page || 1;
  const userFilters: Array<any> = [
    {
      user: { $ne: authUserId },
    },
    {
      userType: UserType.DOCTOR,
    },
  ];
  if (fullName)
    userFilters.push({
      $expr: {
        $regexMatch: {
          input: { $concat: ['$firstName', ' ', '$lastName'] },
          regex: '.*' + fullName + '.*',
          options: 'i',
        },
      },
    });
  const doctorFilters: Array<any> = [];
  if (dto.speciality)
    doctorFilters.push({
      $or: [
        { firstSpeciality: new Types.ObjectId(dto.speciality) },
        { secondSpeciality: new Types.ObjectId(dto.speciality) },
      ],
    });
  if (dto.academicDegree) doctorFilters.push({ academicDegree: dto.academicDegree });
  if (dto.category) doctorFilters.push({ category: dto.category });
  if (dto.type) doctorFilters.push({ type: dto.type });
  if (dto.universityGraduationYear)
    doctorFilters.push({ universityGraduationYear: dto.universityGraduationYear });
  if (dto.university) doctorFilters.push({ university: new Types.ObjectId(dto.university) });
  const usersData = await DoctorInfoModel.aggregate([
    {
      $match: {
        $and: !isEmpty(doctorFilters) ? doctorFilters : [{}],
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'fromUsers',
      },
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$fromUsers', 0] }, '$$ROOT'] } },
    },
    { $project: { fromUsers: 0 } },
    { $match: { $and: userFilters } },
    {
      $addFields: {
        totalCount: { $sum: {} },
      },
    },
    {
      $facet: {
        metadata: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
            },
          },
        ],
        data: [
          { $sort: { user: -1 } },
          { $skip: PAGE_SIZE * (pageNumber - 1) },
          { $limit: PAGE_SIZE },
        ],
      },
    },
    {
      $project: {
        data: 1,
        total: { $arrayElemAt: ['$metadata.total', 0] },
      },
    },
  ]);
  const data = usersData[0];
  return {
    totalCount: data.total as number,
    items: data.data.map((i: any) => {
      return {
        _id: i.user.toString(),
        firstName: i.firstName,
        lastName: i.lastName,
        avatar: i.avatar,
        userType: i.userType,
        sex: i.sex,
        // relation: UserRelation,
      };
    }),
  };
};
