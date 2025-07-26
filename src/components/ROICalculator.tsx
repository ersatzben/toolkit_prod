import React from 'react';
import { CalculatorPage } from './Calculator/CalculatorPage';

interface ROICalculatorProps {
  onBack: () => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onBack }) => {
  return <CalculatorPage onBack={onBack} />;
}; 