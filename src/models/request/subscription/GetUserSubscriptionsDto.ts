import Ajv from 'ajv';
const ajv = new Ajv();

export default interface GetUserSubscriptionsDto {
  page: string;
}

const schema = {
  type: 'object',
  properties: {
    page: { type: 'string' },
  },
  required: [],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
