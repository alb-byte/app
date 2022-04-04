import Ajv, { JSONSchemaType } from 'ajv';
import { EditPacientInfoDto } from '../../../newLib/dto/profile/EditPacientInfoDto';
const ajv = new Ajv();

const schema: JSONSchemaType<EditPacientInfoDto> = {
  type: 'object',
  required: [
    'showInfo',
    'heartDisease',
    'bloodDisease',
    'liverDisease',
    'kidneyDisease',
    'lungDisease',
    'skinDisease',
    'infectiousDisease',
    'bowelDisease',
    'eyeDisease',
    'entDisease',
    'pacemakerPresence',
    'epilepsy',
    //
    'injury',
    'operations',
    'bloodTransfusion',
    'concussion',
    'radiationChemoTherapy',
    'smoking',
    'pregnancy',
    'lactation',
    'contraceptives',
  ],
  properties: {
    heartDisease: { type: 'boolean' },
    showInfo: { type: 'boolean' },
    bloodDisease: { type: 'boolean' },
    liverDisease: { type: 'boolean' },
    kidneyDisease: { type: 'boolean' },
    lungDisease: { type: 'boolean' },
    skinDisease: { type: 'boolean' },
    infectiousDisease: { type: 'boolean' },
    bowelDisease: { type: 'boolean' },
    eyeDisease: { type: 'boolean' },
    entDisease: { type: 'boolean' },
    pacemakerPresence: { type: 'boolean' },
    epilepsy: { type: 'boolean' },

    injury: { type: 'boolean' },
    operations: { type: 'boolean' },
    bloodTransfusion: { type: 'boolean' },
    concussion: { type: 'boolean' },
    radiationChemoTherapy: { type: 'boolean' },

    allergy: {
      type: 'object',
      required: [
        'antibiotics',
        'iodinePreparations',
        'hormonalPreparations',
        'pollen',
        'foodProducts',
        'animal',
      ],
      properties: {
        antibiotics: { type: 'boolean' },
        iodinePreparations: { type: 'boolean' },
        hormonalPreparations: { type: 'boolean' },
        pollen: { type: 'boolean' },
        foodProducts: { type: 'boolean' },
        animal: { type: 'boolean' },
      },
    },
    smoking: { type: 'boolean' },
    pregnancy: { type: 'boolean' },
    lactation: { type: 'boolean' },
    contraceptives: { type: 'boolean' },
  },
  additionalProperties: false,
};
export const validate = ajv.compile(schema);
