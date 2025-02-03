import { Calculation, CalculationDocument } from '../models/Calculation';

const saveCalculation = async (expression: string, result: string): Promise<void> => {
  try {
    const newCalc: CalculationDocument = new Calculation({ expression, result });
    await newCalc.save();
  } catch (error) {
    console.error("Error saving calculation:", error);
  }
};

export default saveCalculation;