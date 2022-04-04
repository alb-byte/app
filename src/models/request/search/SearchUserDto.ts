import Ajv from 'ajv';
const ajv = new Ajv();

export default interface SearchUserDto {
  fullName?: string;
  page: number;
}

const schema = {
  type: 'object',
  properties: {
    fullName: { type: 'string' },
    page: { type: 'number' },
  },
  required: [],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
