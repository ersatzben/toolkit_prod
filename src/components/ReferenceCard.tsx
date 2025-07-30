import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../styles/foundations/theme';

export interface Reference {
  authors: string;
  title: string;
  details?: string;
  url?: string;
  year?: string;
}

interface ReferenceCardProps {
  reference: Reference;
  compact?: boolean;
}

const ReferenceItem = styled.div<{ compact?: boolean }>`
  margin-bottom: ${props => props.compact ? '1rem' : '1.5rem'};
  padding: ${props => props.compact ? '0.75rem' : '1rem'};
  background: white;
  border-radius: ${props => props.compact ? '6px' : '8px'};
  border-left: ${props => props.compact ? '3px' : '4px'} solid ${newBrandColors.brightGreen};
  box-shadow: 0 ${props => props.compact ? '1px 4px' : '2px 8px'} rgba(0, 0, 0, 0.05);
  
  &:hover {
    box-shadow: 0 ${props => props.compact ? '2px 8px' : '4px 12px'} rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }
`;

const ReferenceAuthors = styled.div<{ compact?: boolean }>`
  font-weight: 600;
  color: ${newBrandColors.darkGreen};
  margin-bottom: ${props => props.compact ? '0.2rem' : '0.25rem'};
  font-size: ${props => props.compact ? '0.9rem' : '1rem'};
`;

const ReferenceTitle = styled.div<{ compact?: boolean }>`
  font-style: italic;
  color: ${newBrandColors.charcoal};
  margin-bottom: ${props => props.compact ? '0.2rem' : '0.25rem'};
  line-height: ${props => props.compact ? '1.3' : '1.4'};
  font-size: ${props => props.compact ? '0.9rem' : '1rem'};
`;

const ReferenceDetails = styled.div<{ compact?: boolean }>`
  color: ${newBrandColors.charcoal};
  opacity: 0.8;
  font-size: ${props => props.compact ? '0.8rem' : '0.9rem'};
  margin-bottom: ${props => props.compact ? '0.4rem' : '0.5rem'};
`;

const ReferenceLink = styled.a<{ compact?: boolean }>`
  color: ${newBrandColors.darkBlue};
  text-decoration: none;
  font-size: ${props => props.compact ? '0.8rem' : '0.85rem'};
  
  &:hover {
    color: ${newBrandColors.brightGreen};
    text-decoration: underline;
  }
`;

export const ReferenceCard: React.FC<ReferenceCardProps> = ({ reference, compact = false }) => {
  return (
    <ReferenceItem compact={compact}>
      <ReferenceAuthors compact={compact}>{reference.authors}</ReferenceAuthors>
      <ReferenceTitle compact={compact}>{reference.title}</ReferenceTitle>
      {reference.details && (
        <ReferenceDetails compact={compact}>{reference.details}</ReferenceDetails>
      )}
      {reference.url && (
        <ReferenceLink href={reference.url} target="_blank" compact={compact}>
          View {reference.url.includes('nber.org') || reference.url.includes('dallasfed.org') ? 'Paper' : 
               reference.url.includes('assets.publishing.service.gov.uk') ? 'Report' : 'Article'}
        </ReferenceLink>
      )}
    </ReferenceItem>
  );
};