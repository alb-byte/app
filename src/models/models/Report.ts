import { Schema, model } from 'mongoose';
import { IReport } from '../interfaces';
const ReportSchema = new Schema<IReport>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: {
      type: Schema.Types.String,
      required: true,
    },
    isChecked: {
      type: Schema.Types.Boolean,
      required: true,
    },
  },
  { versionKey: false },
);
export const ReportModel = model<IReport>('Report', ReportSchema);
