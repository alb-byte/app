import SearchUserDto from '../models/request/search/SearchUserDto';
import SearchDoctorDto from '../models/request/search/SearchDoctorDto';
import _ from 'lodash';
import { IUser } from '../models/interfaces';
import { UserModel } from '../models/models';
const PAGE_SIZE = 5;
interface SearchUsersResponse {
  totalCount: number;
  users: Array<IUser>;
}
export const searchUser = async (
  authUserId: string,
  dto: SearchUserDto,
): Promise<SearchUsersResponse> => {
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
  const users = await UserModel.find(predicate, {
    _id: 1,
    firstName: 1,
    lastName: 1,
    avatar: 1,
    isDoctor: 1,
  })
    .sort({ firstName: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);
  const totalCount = await UserModel.countDocuments(predicate);
  return {
    users,
    totalCount,
  };
};

export const searchDoctor = async (
  authUserId: string,
  dto: SearchDoctorDto,
): Promise<SearchUsersResponse> => {
  const { page, fullName, ...search } = dto;
  const pageNumber = page || 1;
  const termFilter = fullName && {
    $expr: {
      $regexMatch: {
        input: { $concat: ['$firstName', ' ', '$lastName'] },
        regex: '.*' + fullName + '.*',
        options: 'i',
      },
    },
  };

  const doctorInfoFilterIsExists = !_.isEmpty(search);
  const doctorInfoFilter = {};
  if (doctorInfoFilterIsExists) {
    _.forOwn(search, function (value, key) {
      const propName = 'doctorInfo.' + key;
      _.assign(doctorInfoFilter, { [propName]: value });
    });
  }
  const globalFilter = doctorInfoFilterIsExists
    ? {
        isDoctor: true,
        _id: { $ne: authUserId },
        ...doctorInfoFilter,
      }
    : {
        _id: { $ne: authUserId },
        isDoctor: true,
      };
  const predicate = termFilter
    ? {
        $and: [termFilter, globalFilter],
      }
    : globalFilter;
  const users = await UserModel.find(predicate, {
    _id: 1,
    firstName: 1,
    lastName: 1,
    avatar: 1,
    isDoctor: 1,
  })
    .sort({ firstName: -1 })
    .skip((pageNumber - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);
  const totalCount = await UserModel.countDocuments(predicate);
  return {
    users,
    totalCount,
  };
};
