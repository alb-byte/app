import Ajv, { JSONSchemaType } from 'ajv';
import { ResendCodeRequestDto } from '../../../newLib/dto/auth/ResendCodeRequestDto';
const ajv = new Ajv();

const schema: JSONSchemaType<ResendCodeRequestDto> = {
  type: 'object',
  properties: {
    email: { type: 'string' },
  },
  required: ['email'],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
