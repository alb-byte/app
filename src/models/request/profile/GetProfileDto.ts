import Ajv from 'ajv';
const ajv = new Ajv();

export default interface GetProfileDto {
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  address?: string;
  aboutMe?: string;
  speciality?: number;
  academicDegree?: number;
  type?: number;
  university?: number;
  universityGraduationYear?: number;
}

const schema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    address: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    patronymic: { type: 'string' },
    aboutMe: { type: 'string' },
    speciality: { type: 'number' },
    academicDegree: { type: 'number' },
    type: { type: 'number' },
    university: { type: 'number' },
    universityGraduationYear: { type: 'number' },
  },
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
