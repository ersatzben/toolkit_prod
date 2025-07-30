import styled from 'styled-components';
import { media } from '../foundations/breakpoints';
import { newBrandColors, typography, spacing, toolColors, objectiveColors } from '../foundations/theme';

// Responsive heading components
export const PageTitle = styled.h1`
  margin: 0;
  font-size: ${typography.fontSize['3xl'].desktop};
  font-weight: ${typography.fontWeight.bold};
  color: ${newBrandColors.charcoal};
  line-height: ${typography.lineHeight.tight};

  ${media.tablet} {
    font-size: ${typography.fontSize['3xl'].mobile};
  }

  ${media.mobile} {
    font-size: ${typography.fontSize['2xl'].mobile};
  }
`;

export const SectionTitle = styled.h2<{ itemType?: 'tool' | 'objective'; variant?: 'filter' }>`
  color: ${props => props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary};
  margin-bottom: ${props => props.variant === 'filter' ? spacing.md.desktop : spacing.lg.desktop};
  font-size: ${props => props.variant === 'filter' ? typography.fontSize.lg.desktop : typography.fontSize.xl.desktop};
  font-weight: ${props => props.variant === 'filter' ? typography.fontWeight.medium : typography.fontWeight.semibold};
  padding-bottom: ${props => props.variant === 'filter' ? '8px' : '16px'};
  border-bottom: 1px solid ${props => props.variant === 'filter' ? newBrandColors.lightBlue + '40' : newBrandColors.brightGreen + '30'};
  line-height: ${typography.lineHeight.tight};

  ${media.tablet} {
    font-size: ${props => props.variant === 'filter' ? typography.fontSize.base.mobile : typography.fontSize.xl.mobile};
    margin-bottom: ${props => props.variant === 'filter' ? spacing.sm.mobile : spacing.md.mobile};
  }

  ${media.mobile} {
    font-size: ${props => props.variant === 'filter' ? typography.fontSize.sm.mobile : typography.fontSize.lg.mobile};
  }
`;

export const SubSectionTitle = styled.h3<{ itemType?: 'tool' | 'objective'; variant?: 'filter' }>`
  color: ${props => props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary};
  margin-bottom: ${props => props.variant === 'filter' ? '0' : spacing.md.desktop};
  font-size: ${props => props.variant === 'filter' ? typography.fontSize.sm.desktop : typography.fontSize.lg.desktop};
  font-weight: ${typography.fontWeight.medium};
  line-height: ${typography.lineHeight.normal};

  ${props => props.variant === 'filter' && `
    margin-right: 8px;
    flex-shrink: 0;
    
    ${media.mobile} {
      margin-right: 0;
      margin-bottom: 4px;
    }
  `}

  ${media.tablet} {
    font-size: ${props => props.variant === 'filter' ? typography.fontSize.xs.mobile : typography.fontSize.base.mobile};
    margin-bottom: ${props => props.variant === 'filter' ? '0' : spacing.sm.mobile};
  }
`;

export const SidebarTitle = styled.h2<{ itemType?: 'tool' | 'objective' }>`
  font-size: ${typography.fontSize.lg.desktop};
  margin-top: 0;
  margin-bottom: ${spacing.sm.desktop};
  padding-bottom: 5px;
  border-bottom: 1px solid ${newBrandColors.lightBlue}50;
  color: ${(props) => (props.itemType === 'tool' ? toolColors.primary : objectiveColors.primary)};
  cursor: pointer;
  font-weight: ${typography.fontWeight.semibold};

  ${media.tablet} {
    font-size: ${typography.fontSize.base.mobile};
    margin-bottom: ${spacing.xs.mobile};
  }
`;

export const SidebarSubheading = styled.h3`
  font-size: ${typography.fontSize.sm.desktop};
  font-weight: ${typography.fontWeight.bold};
  margin-top: ${spacing.sm.desktop};
  margin-bottom: 5px;
  padding-left: 8px;
  color: ${objectiveColors.primary};

  ${media.tablet} {
    font-size: ${typography.fontSize.xs.mobile};
    margin-top: ${spacing.xs.mobile};
  }
`;

export const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

export const HeaderTitle = styled.h1`
  font-size: ${typography.fontSize.lg.desktop};
  font-weight: ${typography.fontWeight.bold};
  color: ${newBrandColors.beige};
  margin: 0;
  line-height: ${typography.lineHeight.tight};

  ${media.tablet} {
    font-size: ${typography.fontSize.base.mobile};
  }

  ${media.mobile} {
    font-size: ${typography.fontSize.sm.mobile};
  }
`;

export const HeaderSubtitle = styled.h2`
  font-size: ${typography.fontSize.base.desktop};
  font-weight: ${typography.fontWeight.medium};
  color: ${newBrandColors.beige};
  margin: 0;
  opacity: 0.9;
  line-height: ${typography.lineHeight.tight};

  ${media.tablet} {
    font-size: ${typography.fontSize.sm.mobile};
  }

  ${media.mobile} {
    font-size: ${typography.fontSize.xs.mobile};
  }
`;

// Paragraph and text components
export const Paragraph = styled.p<{ variant?: 'large' | 'compact' }>`
  margin-bottom: ${props => props.variant === 'compact' ? '0.8em' : '1.2em'};
  line-height: ${props => props.variant === 'large' ? typography.lineHeight.loose : typography.lineHeight.relaxed};
  color: ${newBrandColors.charcoal};
  opacity: 0.9;
  font-size: ${props => props.variant === 'large' ? typography.fontSize.lg.desktop : typography.fontSize.base.desktop};
  
  &:last-child {
    margin-bottom: 0;
  }

  ${media.tablet} {
    font-size: ${props => props.variant === 'large' ? typography.fontSize.base.mobile : typography.fontSize.base.mobile};
  }
`;

export const MarkdownText = styled.div<{ variant?: 'large' }>`
  p {
    margin-bottom: 1.2em;
    line-height: ${props => props.variant === 'large' ? typography.lineHeight.loose : typography.lineHeight.relaxed};
    color: ${newBrandColors.charcoal};
    opacity: 0.9;
    font-size: ${props => props.variant === 'large' ? typography.fontSize.lg.desktop : typography.fontSize.base.desktop};
    
    &:last-child {
      margin-bottom: 0;
    }

    ${media.tablet} {
      font-size: ${props => props.variant === 'large' ? typography.fontSize.base.mobile : typography.fontSize.base.mobile};
    }
  }

  strong {
    font-weight: ${typography.fontWeight.semibold};
    color: ${newBrandColors.darkGreen};
  }

  em {
    font-style: italic;
    color: ${newBrandColors.charcoal};
    opacity: 0.7;
  }

  p > code {
    background-color: ${newBrandColors.beige}80;
    padding: 3px 6px;
    border-radius: 4px;
    font-family: ${typography.fontFamily.mono};
    font-size: 0.9em;
    color: ${newBrandColors.darkGreen};
  }
`;

// Text utilities
export const TextCenter = styled.div`
  text-align: center;
`;

export const TextMuted = styled.span`
  color: ${newBrandColors.charcoal};
  opacity: 0.7;
`;

export const TextEmphasis = styled.span`
  font-weight: ${typography.fontWeight.semibold};
  color: ${newBrandColors.darkGreen};
`;

export const TextSmall = styled.span`
  font-size: ${typography.fontSize.sm.desktop};
  
  ${media.tablet} {
    font-size: ${typography.fontSize.xs.mobile};
  }
`;