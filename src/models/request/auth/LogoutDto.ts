import Ajv, { JSONSchemaType } from 'ajv';
import { RefreshTokenRequestDto } from '../../../newLib/dto/auth/RefreshTokenRequestDto';
const ajv = new Ajv();

const schema: JSONSchemaType<RefreshTokenRequestDto> = {
  type: 'object',
  properties: {
    refreshToken: { type: 'string' },
  },
  required: ['refreshToken'],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
