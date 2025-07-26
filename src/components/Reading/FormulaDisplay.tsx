import React from 'react';
import styled from 'styled-components';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { newBrandColors } from '../../styles/theme';

const FormulaContainer = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.lightBlue}20, ${newBrandColors.beige}30);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  text-align: center;
  border-left: 4px solid ${newBrandColors.darkBlue};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const FormulaTitle = styled.h4`
  color: ${newBrandColors.charcoal};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FormulaExplanation = styled.p`
  color: ${newBrandColors.charcoal};
  font-size: 0.9rem;
  margin-top: 1rem;
  opacity: 0.8;
  text-align: left;
`;

interface FormulaDisplayProps {
  latex: string;
  title?: string;
  explanation?: string;
  inline?: boolean;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ 
  latex, 
  title, 
  explanation, 
  inline = false 
}) => {
  if (inline) {
    return <InlineMath math={latex} />;
  }

  return (
    <FormulaContainer>
      {title && <FormulaTitle>{title}</FormulaTitle>}
      <BlockMath math={latex} />
      {explanation && <FormulaExplanation>{explanation}</FormulaExplanation>}
    </FormulaContainer>
  );
}; 