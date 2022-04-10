import { Schema, model } from 'mongoose';
import { IPacientInfo } from '../interfaces';
const PacientInfoSchema = new Schema<IPacientInfo>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    heartDisease: {
      type: Schema.Types.Boolean,
      required: true,
    },
    bloodDisease: {
      type: Schema.Types.Boolean,
      required: true,
    },
    liverDisease: {
      type: Schema.Types.Boolean,
      required: true,
    },
    kidneyDisease: {
      type: Schema.Types.Boolean,
      required: true,
    },
    lungDisease: {
      type: Schema.Types.Boolean,
      required: true,
    },
    skinDisease: {
      type: Schema.Types.Boolean,
      required: true,
    },
    infectiousDisease: {
      type: Schema.Types.Boolean,
      required: true,
    },
    bowelDisease: {
      type: Schema.Types.Boolean,
      required: true,
    },
    eyeDisease: {
      type: Schema.Types.Boolean,
      required: true,
    },
    entDisease: {
      type: Schema.Types.Boolean,
      required: true,
    },
    pacemakerPresence: {
      type: Schema.Types.Boolean,
      required: true,
    },
    epilepsy: {
      type: Schema.Types.Boolean,
      required: true,
    },
    //
    injury: {
      type: Schema.Types.Boolean,
      required: true,
    },
    operations: {
      type: Schema.Types.Boolean,
      required: true,
    },
    bloodTransfusion: {
      type: Schema.Types.Boolean,
      required: true,
    },
    concussion: {
      type: Schema.Types.Boolean,
      required: true,
    },
    radiationChemoTherapy: {
      type: Schema.Types.Boolean,
      required: true,
    },
    allergy: {
      antibiotics: {
        type: Schema.Types.Boolean,
        required: true,
      },
      iodinePreparations: {
        type: Schema.Types.Boolean,
        required: true,
      },
      hormonalPreparations: {
        type: Schema.Types.Boolean,
        required: true,
      },
      pollen: {
        type: Schema.Types.Boolean,
        required: true,
      },
      foodProducts: {
        type: Schema.Types.Boolean,
        required: true,
      },
      animal: {
        type: Schema.Types.Boolean,
        required: true,
      },
    },
    smoking: {
      type: Schema.Types.Boolean,
      required: true,
    },
    pregnancy: {
      type: Schema.Types.Boolean,
      required: true,
    },
    lactation: {
      type: Schema.Types.Boolean,
      required: true,
    },
    contraceptives: {
      type: Schema.Types.Boolean,
      required: true,
    },
  },
  { versionKey: false },
);
export const PacientInfoModel = model<IPacientInfo>('PacientInfo', PacientInfoSchema);
