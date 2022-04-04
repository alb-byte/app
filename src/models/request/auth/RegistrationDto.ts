import Ajv, { JSONSchemaType } from 'ajv';
import { RegistrationRequestDto } from '../../../newLib/dto/auth/RegistrationRequestDto';
import { AcademicDegree, DoctorCategory, DoctorType, Sex, UserType } from '../../../newLib/enums';
import { getEnumValues } from '../../../utils/enum';
const ajv = new Ajv();

const registrationSchema: JSONSchemaType<RegistrationRequestDto> = {
  required: ['firstName', 'lastName', 'password', 'email', 'sex', 'userType'],
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    sex: {
      type: 'number',
      enum: getEnumValues(Sex),
    },
    userType: {
      type: 'number',
      enum: getEnumValues(UserType),
    },
    doctorInfo: {
      type: 'object',
      nullable: true,
      required: [
        'firstSpeciality',
        'academicDegree',
        'category',
        'type',
        'university',
        'universityGraduationYear',
      ],
      properties: {
        address: { type: 'string', nullable: true },
        firstSpeciality: { type: 'string' },
        secondSpeciality: { type: 'string', nullable: true },
        academicDegree: { type: 'number', enum: getEnumValues(AcademicDegree) },
        category: { type: 'number', enum: getEnumValues(DoctorCategory) },
        type: { type: 'number', enum: getEnumValues(DoctorType) },
        university: { type: 'string' },
        universityGraduationYear: { type: 'number' },
      },
    },
  },
};

export const validate = ajv.compile(registrationSchema);
