import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/foundations/theme';
import type { ResearchReference as ResearchReferenceType } from '../../types/Reading';

const ReferenceContainer = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.lightBlue}15, ${newBrandColors.beige}30);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  border-left: 4px solid ${newBrandColors.darkBlue};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ReferenceTitle = styled.h3`
  color: ${newBrandColors.charcoal};
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ReferenceDetails = styled.p`
  color: ${newBrandColors.darkBlue};
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
`;

const ReferenceDescription = styled.p`
  color: ${newBrandColors.charcoal};
  margin-bottom: 1rem;
  line-height: 1.5;
  opacity: 0.9;
`;

const FindingsList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;

  li {
    padding: 0.25rem 0;
    color: ${newBrandColors.charcoal};
    opacity: 0.8;
    
    &:before {
      content: "•";
      color: ${newBrandColors.darkBlue};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: 0;
    }
  }
`;

interface ResearchReferenceProps {
  reference: ResearchReferenceType;
}

export const ResearchReference: React.FC<ResearchReferenceProps> = ({ reference }) => {
  return (
    <ReferenceContainer>
      <ReferenceTitle>{reference.title}</ReferenceTitle>
      <ReferenceDetails>
        {reference.authors} ({reference.year})
      </ReferenceDetails>
      <ReferenceDescription>
        {reference.description}
      </ReferenceDescription>
      {reference.keyFindings.length > 0 && (
        <FindingsList>
          {reference.keyFindings.map((finding, index) => (
            <li key={index}>{finding}</li>
          ))}
        </FindingsList>
      )}
    </ReferenceContainer>
  );
}; 