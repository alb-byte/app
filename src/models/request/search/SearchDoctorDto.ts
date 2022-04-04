import Ajv from 'ajv';
const ajv = new Ajv();

export default interface SearchDoctorDto {
  fullName?: string;
  speciality?: string;
  academicDegree?: number;
  category?: number;
  type?: number;
  university?: string;
  page: number;
}

const schema = {
  type: 'object',
  properties: {
    fullName: { type: 'string' },
    speciality: { type: 'string' },
    academicDegree: { type: 'number' },
    category: { type: 'number' },
    type: { type: 'number' },
    university: { type: 'string' },
    page: { type: 'number' },
  },
  required: [],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
