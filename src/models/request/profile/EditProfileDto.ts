import Ajv, { JSONSchemaType } from 'ajv';
import { EditProfileRequestDto } from '../../../newLib/dto/profile/EditProfileRequestDto';
const ajv = new Ajv();

const schema: JSONSchemaType<EditProfileRequestDto> = {
  type: 'object',
  properties: {
    avatar: { type: 'string', nullable: true },
    aboutMe: { type: 'string', nullable: true },
  },
};

export const validate = ajv.compile(schema);
