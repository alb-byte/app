import Ajv, { JSONSchemaType } from 'ajv';
import { DoctorInfoDto } from '../../../newLib/dto/profile/DoctorInfoDto';
import { AcademicDegree, DoctorCategory, DoctorType } from '../../../newLib/enums';
import { getEnumValues } from '../../../utils/enum';
const ajv = new Ajv();

const schema: JSONSchemaType<DoctorInfoDto> = {
  type: 'object',
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
  additionalProperties: false,
};
export const validate = ajv.compile(schema);
