import styled from 'styled-components';
import { media } from '../foundations/breakpoints';
import { newBrandColors, spacing, typography } from '../foundations/theme';

// Form layout components
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing['2xl'].desktop};
  margin-top: ${spacing.lg.desktop};

  ${media.desktop} {
    gap: ${spacing.xl.mobile};
    margin-top: ${spacing.md.mobile};
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: ${spacing.lg.mobile};
  }
`;

export const FormSection = styled.section`
  background: white;
  border-radius: 12px;
  padding: ${spacing.xl.desktop};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${newBrandColors.lightBlue}30;

  ${media.tablet} {
    padding: ${spacing.lg.mobile};
    border-radius: 8px;
  }

  ${media.mobile} {
    padding: ${spacing.md.mobile};
  }
`;

export const FormSectionTitle = styled.h2`
  color: ${newBrandColors.charcoal};
  font-size: ${typography.fontSize.xl.desktop};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.md.desktop};
  border-bottom: 1px solid ${newBrandColors.lightBlue}50;
  padding-bottom: 0.5rem;

  ${media.tablet} {
    font-size: ${typography.fontSize.lg.mobile};
    margin-bottom: ${spacing.sm.mobile};
  }
`;

export const FormSectionDescription = styled.p`
  color: ${newBrandColors.charcoal};
  line-height: ${typography.lineHeight.relaxed};
  margin-bottom: ${spacing.lg.desktop};
  opacity: 0.8;

  ${media.tablet} {
    margin-bottom: ${spacing.md.mobile};
  }
`;

// Input components
export const InputGroup = styled.div`
  margin-bottom: ${spacing.lg.desktop};

  ${media.tablet} {
    margin-bottom: ${spacing.md.mobile};
  }
`;

export const InputLabel = styled.label`
  display: block;
  font-weight: ${typography.fontWeight.semibold};
  color: ${newBrandColors.charcoal};
  margin-bottom: ${spacing.sm.desktop};
  font-size: ${typography.fontSize.base.desktop};

  ${media.tablet} {
    font-size: ${typography.fontSize.sm.mobile};
    margin-bottom: ${spacing.xs.mobile};
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${newBrandColors.lightBlue}50;
  border-radius: 8px;
  font-size: ${typography.fontSize.base.desktop};
  color: ${newBrandColors.charcoal};
  background-color: white;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${newBrandColors.darkGreen};
    box-shadow: 0 0 0 3px ${newBrandColors.brightGreen}30;
  }

  &:hover {
    border-color: ${newBrandColors.lightBlue}70;
  }

  ${media.tablet} {
    padding: 0.6rem;
    font-size: ${typography.fontSize.sm.mobile};
  }
`;

export const InputDescription = styled.p`
  font-size: ${typography.fontSize.sm.desktop};
  color: ${newBrandColors.charcoal};
  opacity: 0.7;
  margin-top: ${spacing.xs.desktop};
  line-height: ${typography.lineHeight.normal};

  ${media.tablet} {
    font-size: ${typography.fontSize.xs.mobile};
  }
`;

// Button components
export const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.sm.desktop};
  flex-wrap: wrap;
  margin-bottom: ${spacing.lg.desktop};

  ${media.tablet} {
    gap: ${spacing.xs.mobile};
    margin-bottom: ${spacing.md.mobile};
  }
`;

export const PresetButton = styled.button<{ active?: boolean }>`
  padding: ${spacing.sm.desktop} ${spacing.md.desktop};
  background: ${props => props.active 
    ? `linear-gradient(135deg, ${newBrandColors.darkGreen}, ${newBrandColors.darkBlue})`
    : 'white'
  };
  color: ${props => props.active ? newBrandColors.beige : newBrandColors.charcoal};
  border: 2px solid ${newBrandColors.lightBlue}50;
  border-radius: 8px;
  cursor: pointer;
  font-size: ${typography.fontSize.sm.desktop};
  font-weight: ${typography.fontWeight.medium};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.active 
      ? `linear-gradient(135deg, ${newBrandColors.brightGreen}, ${newBrandColors.lightBlue})`
      : newBrandColors.lightBlue + '20'
    };
    border-color: ${newBrandColors.lightBlue}70;
    transform: translateY(-1px);
  }

  ${media.tablet} {
    padding: ${spacing.xs.mobile} ${spacing.sm.mobile};
    font-size: ${typography.fontSize.xs.mobile};
  }
`;

export const PrimaryButton = styled.button`
  padding: ${spacing.md.desktop} ${spacing.lg.desktop};
  background: linear-gradient(135deg, ${newBrandColors.darkGreen}, ${newBrandColors.darkBlue});
  color: ${newBrandColors.beige};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: ${typography.fontSize.base.desktop};
  font-weight: ${typography.fontWeight.semibold};
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, ${newBrandColors.brightGreen}, ${newBrandColors.lightBlue});
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  ${media.tablet} {
    padding: ${spacing.sm.mobile} ${spacing.md.mobile};
    font-size: ${typography.fontSize.sm.mobile};
  }
`;

// Preset components
export const PresetContainer = styled.div`
  margin-bottom: ${spacing.xl.desktop};

  ${media.tablet} {
    margin-bottom: ${spacing.lg.mobile};
  }
`;

export const PresetTitle = styled.h3`
  color: ${newBrandColors.charcoal};
  font-size: ${typography.fontSize.lg.desktop};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing.md.desktop};

  ${media.tablet} {
    font-size: ${typography.fontSize.base.mobile};
    margin-bottom: ${spacing.sm.mobile};
  }
`;

// Research guidance component
export const ResearchGuidance = styled.div`
  background: ${newBrandColors.lightBlue}20;
  border-left: 4px solid ${newBrandColors.darkBlue};
  padding: ${spacing.md.desktop};
  margin-bottom: ${spacing.lg.desktop};
  border-radius: 0 8px 8px 0;
  font-size: ${typography.fontSize.sm.desktop};
  line-height: ${typography.lineHeight.relaxed};
  color: ${newBrandColors.charcoal};

  ${media.tablet} {
    padding: ${spacing.sm.mobile};
    margin-bottom: ${spacing.md.mobile};
    font-size: ${typography.fontSize.xs.mobile};
  }
`;