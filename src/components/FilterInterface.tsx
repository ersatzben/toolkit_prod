import React, { useState } from 'react';
import type { TagsList } from '../types/Tool';
import styled from 'styled-components';
import { media } from '../styles/foundations/breakpoints';
import { newBrandColors, spacing } from '../styles/foundations/theme';

const FilterContainer = styled.div`
  margin-bottom: ${spacing.md.desktop};
  border: 1px solid ${newBrandColors.lightBlue}40;
  border-radius: 8px;
  background-color: #ffffff;
  overflow: hidden;

  ${media.tablet} {
    margin-bottom: ${spacing.sm.mobile};
  }
`;

const FilterHeader = styled.div<{ $isExpanded: boolean }>`
  padding: ${spacing.sm.desktop} ${spacing.md.desktop};
  background-color: ${newBrandColors.lightBlue}08;
  border-bottom: ${props => props.$isExpanded ? `1px solid ${newBrandColors.lightBlue}20` : 'none'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${newBrandColors.darkBlue};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${newBrandColors.lightBlue}12;
  }

  ${media.tablet} {
    padding: ${spacing.sm.mobile};
    font-size: 0.85rem;
  }
`;

const FilterContent = styled.div<{ $isExpanded: boolean }>`
  max-height: ${props => props.$isExpanded ? '350px' : '0'};
  overflow-y: auto;
  overflow-x: hidden;
  transition: max-height 0.3s ease;
  background-color: #ffffff;

  ${media.tablet} {
    max-height: ${props => props.$isExpanded ? '300px' : '0'};
  }
`;

const FilterCategory = styled.div`
  padding: ${spacing.sm.desktop} ${spacing.md.desktop};
  border-bottom: 1px solid ${newBrandColors.lightBlue}15;

  &:last-child {
    border-bottom: none;
  }

  ${media.tablet} {
    padding: ${spacing.sm.mobile};
  }
`;

const CategoryTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${newBrandColors.charcoal};
  margin-bottom: ${spacing.xs.desktop};
`;

const FilterButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: 4px 8px;
  border: 1px solid ${props => props.$isActive ? newBrandColors.darkBlue : newBrandColors.lightBlue + '60'};
  border-radius: 4px;
  background-color: ${props => props.$isActive ? newBrandColors.darkBlue : '#ffffff'};
  color: ${props => props.$isActive ? '#ffffff' : newBrandColors.darkBlue};
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.2;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.$isActive ? newBrandColors.darkBlue : newBrandColors.lightBlue + '15'};
    border-color: ${props => props.$isActive ? newBrandColors.darkBlue : newBrandColors.lightBlue + '80'};
  }

  ${media.tablet} {
    padding: 3px 6px;
    font-size: 0.7rem;
  }
`;

const ExpandIcon = styled.span<{ $isExpanded: boolean }>`
  transition: transform 0.2s ease;
  transform: rotate(${props => props.$isExpanded ? '90deg' : '0deg'});
  font-size: 0.8rem;
  color: ${newBrandColors.darkBlue};
`;

const ActiveCount = styled.span`
  background-color: ${newBrandColors.darkBlue};
  color: #ffffff;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 0.7rem;
  margin-left: 8px;
  min-width: 16px;
  text-align: center;
  display: inline-block;
`;

interface FilterInterfaceProps {
  tagsList: TagsList | null;
  activeFilters: string[];
  onFilterToggle: (tag: string) => void;
}

export const FilterInterface: React.FC<FilterInterfaceProps> = ({
  tagsList,
  activeFilters,
  onFilterToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  const categoryTitles = {
    objectives: 'Objectives',
    innovation_stage: 'Stage',
    sectors: 'Sectors',
    delivery_mechanism: 'Mechanism',
    targeting: 'Targeting',
    timeline: 'Timeline',
  };

  if (!tagsList) {
    return null;
  }

  const totalActiveFilters = activeFilters.length;

  return (
    <FilterContainer>
      <FilterHeader $isExpanded={isExpanded} onClick={toggleFilters}>
        <span>
          Filters
          {totalActiveFilters > 0 && (
            <ActiveCount>{totalActiveFilters}</ActiveCount>
          )}
        </span>
        <ExpandIcon $isExpanded={isExpanded}>▶</ExpandIcon>
      </FilterHeader>
      <FilterContent $isExpanded={isExpanded}>
        {Object.entries(categoryTitles).map(([sectionKey, title]) => {
          const sectionTags = tagsList.tags[sectionKey as keyof typeof tagsList.tags];
          if (!sectionTags?.length) return null;

          return (
            <FilterCategory key={sectionKey}>
              <CategoryTitle>{title}</CategoryTitle>
              <FilterButtonGrid>
                {sectionTags.map(tag => (
                  <FilterButton
                    key={tag.tag}
                    $isActive={activeFilters.includes(tag.tag)}
                    onClick={() => onFilterToggle(tag.tag)}
                  >
                    {tag.name}
                  </FilterButton>
                ))}
              </FilterButtonGrid>
            </FilterCategory>
          );
        })}
      </FilterContent>
    </FilterContainer>
  );
}; 