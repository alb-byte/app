import Ajv, { JSONSchemaType } from 'ajv';
import { LoginRequestDto } from '../../../newLib/dto/auth/LoginRequestDto';
const ajv = new Ajv();

const schema: JSONSchemaType<LoginRequestDto> = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
