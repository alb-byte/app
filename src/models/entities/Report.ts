import { Schema, model } from 'mongoose';
import { IReport } from '../interfaces';
const ReportSchema = new Schema<IReport>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: {
      type: Schema.Types.String,
      required: true,
    },
    isChecked: {
      type: Schema.Types.Boolean,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);
export const ReportModel = model<IReport>('Report', ReportSchema);
