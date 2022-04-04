import Ajv from 'ajv';
const ajv = new Ajv();

export default interface GetMediaDto {
  fileName: string;
}

const schema = {
  type: 'object',
  properties: {
    fileName: { type: 'string' },
  },
  required: ['fileName'],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
