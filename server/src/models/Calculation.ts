import { Document, Schema, model } from 'mongoose';

interface CalculationDocument extends Document {
  expression: string;
  result: string;
  timestamp: Date;
}

const CalculationSchema = new Schema<CalculationDocument>({
  expression: { type: String, required: true },
  result: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Calculation = model<CalculationDocument>('Calculation', CalculationSchema);

export { Calculation, CalculationDocument };