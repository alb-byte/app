import Ajv from 'ajv';
const ajv = new Ajv();

export default interface SubscribeDto {
  userId: string;
}

const schema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
  },
  required: ['userId'],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);