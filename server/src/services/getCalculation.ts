import { Calculation, CalculationDocument } from '../models/Calculation';

const getCalc = async (): Promise<CalculationDocument[]> => {
  return await Calculation.find().sort({ timestamp: -1 }).limit(10);
};

export default getCalc;
