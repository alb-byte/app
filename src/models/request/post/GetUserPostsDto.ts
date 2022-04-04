import Ajv from 'ajv';
const ajv = new Ajv();

export default interface GetUserPostsDto {
  userId: string;
  page: string;
}

const schema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    page: { type: 'string' },
  },
  required: ['userId'],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
