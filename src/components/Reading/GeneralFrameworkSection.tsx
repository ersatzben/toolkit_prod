import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/foundations/theme';
import { FormulaDisplay } from './FormulaDisplay';

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

const SubsectionTitle = styled.h3`
  color: ${newBrandColors.charcoal};
  font-size: 1.3rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
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

const VariableList = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;

  li {
    color: ${newBrandColors.charcoal};
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }
`;

export const GeneralFrameworkSection: React.FC = () => {
  return (
    <Section id="framework">
      <SectionTitle>General Framework for R&D Returns</SectionTitle>
      
      <Paragraph>
        For any given amount of R&D spending (denoted as R), we can calculate the net present value by 
        considering the stream of returns over time, accounting for depreciation of the R&D stock and 
        discounting future benefits.
      </Paragraph>

      <SubsectionTitle>NPV Formula Development</SubsectionTitle>
      <Paragraph>
        The net present value (NPV) of R&D spending at time t can be represented as an infinite sum, 
        where ρ_total represents the total return rate from all channels:
      </Paragraph>

      <FormulaDisplay 
        latex="NPV(R)_t = R_t \times \rho_{total} \times \sum_{n=0}^{\infty} \frac{(1-\delta)^n}{(1+i)^n}"
      />

      <Paragraph>Where:</Paragraph>
      <VariableList>
        <li>R_t is R&D spending at time t</li>
        <li>ρ_total is the total return rate from all channels</li>
        <li>δ is the depreciation rate of R&D stock</li>
        <li>i is the nominal interest rate for discounting</li>
      </VariableList>

      <Paragraph>
        This is an infinite geometric series with first term a = 1 and common ratio r = (1-δ)/(1+i)
      </Paragraph>

      <Paragraph>
        For a geometric series where |r| &lt; 1, the sum is a/(1-r)
      </Paragraph>

      <Paragraph>So:</Paragraph>
      <FormulaDisplay 
        latex="NPV(R)_t = R_t \times \rho_{total} \times \frac{1+i}{i+\delta}"
      />

      <SubsectionTitle>The Benefit-Cost Ratio</SubsectionTitle>
      <Paragraph>
        The Benefit-Cost Ratio (BCR) for R&D investment is defined as the ratio of total NPV to the initial spending:
      </Paragraph>

      <FormulaDisplay 
        latex="BCR = \frac{NPV(R)_t}{R_t} = \rho_{total} \times \frac{1+i}{i+\delta}"
        explanation="This formula shows how the BCR depends on the total return rate, the interest rate, and the depreciation rate."
      />
    </Section>
  );
}; 