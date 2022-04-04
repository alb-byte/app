import Ajv, { JSONSchemaType } from 'ajv';
import { ConfirmCodeRequestDto } from '../../../newLib/dto/auth/ConfirmCodeRequestDto';
const ajv = new Ajv();

const schema: JSONSchemaType<ConfirmCodeRequestDto> = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    token: { type: 'string' },
  },
  required: ['email', 'token'],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
