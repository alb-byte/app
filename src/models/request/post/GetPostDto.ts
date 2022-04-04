import Ajv from 'ajv';
const ajv = new Ajv();

export default interface GetPostDto {
  id: string;
}

const schema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
