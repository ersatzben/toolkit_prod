import React from 'react';
import { FurtherReadingPage } from './Reading/FurtherReadingPage';

interface FurtherReadingProps {
  onBack: () => void;
}

export const FurtherReading: React.FC<FurtherReadingProps> = ({ onBack }) => {
  return <FurtherReadingPage onBack={onBack} />;
}; 