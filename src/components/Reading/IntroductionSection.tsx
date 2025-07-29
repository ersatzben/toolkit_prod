import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/foundations/theme';

const Section = styled.section`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${newBrandColors.lightBlue}30;
`;

const SectionTitle = styled.h2`
  color: ${newBrandColors.charcoal};
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${newBrandColors.lightBlue}50;
  padding-bottom: 0.5rem;
`;

const Paragraph = styled.p`
  color: ${newBrandColors.charcoal};
  line-height: 1.7;
  margin-bottom: 1.2rem;
  opacity: 0.9;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const IntroductionSection: React.FC = () => {
  return (
    <Section id="introduction">
      <SectionTitle>Introduction</SectionTitle>
      <Paragraph>
        This guide outlines a framework for evaluating the economic returns of research and development (R&D) 
        spending through the benefit-cost ratio (BCR) approach. The analysis provides both private and public 
        sector perspectives on R&D investments, showing how different return mechanisms operate across these domains.
      </Paragraph>
    </Section>
  );
}; 