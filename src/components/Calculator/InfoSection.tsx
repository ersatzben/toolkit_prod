import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/theme';

const InfoSectionContainer = styled.div`
  background: rgba(255,255,255,0.9);
  border-radius: 15px;
  padding: 2rem;
  margin-top: 3rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  border: 1px solid ${newBrandColors.lightBlue}30;
`;

const InfoTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${newBrandColors.charcoal};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoColumn = styled.div``;

const ColumnTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${props => props.color || newBrandColors.charcoal};
`;

const InfoList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    padding: 0.25rem 0;
    color: ${newBrandColors.charcoal};
    opacity: 0.8;
  }
`;

const Guidelines = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.lightBlue}20, ${newBrandColors.beige}40);
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid ${newBrandColors.darkBlue};
`;

const GuidelinesTitle = styled.h4`
  color: ${newBrandColors.charcoal};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const GuidelineText = styled.p`
  margin-bottom: 1rem;
  color: ${newBrandColors.charcoal};
  opacity: 0.8;
  line-height: 1.5;

  strong {
    color: ${newBrandColors.darkBlue};
    font-weight: 600;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoSection: React.FC = () => {
  return (
    <InfoSectionContainer>
      <InfoTitle>Key Differences Between Approaches</InfoTitle>
      <InfoGrid>
        <InfoColumn>
          <ColumnTitle color={newBrandColors.darkBlue}>Private R&D Grants</ColumnTitle>
          <InfoList>
            <li>• Focuses on spillover effects from private R&D</li>
            <li>• Uses product market and technology externality framework</li>
            <li>• Accounts for firm's limited ability to capture spillovers</li>
            <li>• Typically lower total returns but more predictable</li>
          </InfoList>
        </InfoColumn>
        <InfoColumn>
          <ColumnTitle color={newBrandColors.darkGreen}>Public R&D Investment</ColumnTitle>
          <InfoList>
            <li>• Includes leveraging/crowding-in of private R&D</li>
            <li>• Higher spillover rates due to public disclosure</li>
            <li>• Accounts for broader social and economic benefits</li>
            <li>• Typically higher total returns but longer time horizons</li>
          </InfoList>
        </InfoColumn>
      </InfoGrid>
      
      <Guidelines>
        <GuidelinesTitle>Parameter Selection Guidelines</GuidelinesTitle>
        <GuidelineText>
          <strong>For conservative estimates:</strong> Use lower bounds from research ranges, higher depreciation rates
        </GuidelineText>
        <GuidelineText>
          <strong>For sector-specific analysis:</strong> ICT (higher depreciation, moderate spillovers), Pharmaceuticals (lower depreciation, high spillovers), Manufacturing (moderate across parameters)
        </GuidelineText>
        <GuidelineText>
          <strong>For policy planning:</strong> Use multiple scenarios and sensitivity analysis rather than point estimates
        </GuidelineText>
        <GuidelineText>
          <strong>Time horizon matters:</strong> Benefits often take 5-10 years to fully materialise - consider evaluation timeframes
        </GuidelineText>
      </Guidelines>
    </InfoSectionContainer>
  );
}; 