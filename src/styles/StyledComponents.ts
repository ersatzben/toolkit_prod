// Legacy StyledComponents.ts - Updated to use new responsive design system
// This file maintains backward compatibility while using our new components
// TODO: Gradually migrate components to use the new organized structure

// Re-export new responsive components
export { 
  AppContainer, 
  ContentRow, 
  Sidebar, 
  SidebarOverlay,
  MobileMenuButton as SidebarMobileButton,
  MainContent,
  Section,
  SubSection,
  Container,
  ResponsiveGrid
} from './components/Layout';

export {
  PageTitle,
  SectionTitle,
  SubSectionTitle,
  SidebarTitle,
  SidebarSubheading,
  HeaderTitle,
  HeaderTitleContainer,
  HeaderSubtitle,
  Paragraph,
  MarkdownText,
  TextCenter,
  TextMuted,
  TextEmphasis
} from './components/Typography';

export {
  StickyHeader,
  LogoContainer,
  HeaderLogo,
  HeaderGradient,
  HeaderNav,
  HeaderNavLink,
  HomeIcon,
  MobileMenuButton,
  MobileNavMenu,
  MobileNavOverlay,
  MobileNavList,
  MobileNavItem,
  MobileNavLink,
  MobileMenuHeader,
  MobileMenuTitle,
  MobileMenuCloseButton
} from './components/Header';

export {
  MobileToolbar,
  MobileToolbarTitle,
  MobileToolbarButton,
  MobileSidebarContainer,
  MobileSidebarOverlay,
  MobileSidebarHeader,
  MobileSidebarTitle,
  MobileSidebarCloseButton,
  MobileSidebarContent
} from './components/MobileToolbar';

// Legacy components that still need to be maintained for backward compatibility
import styled from '@emotion/styled';
import { media } from './foundations/breakpoints';
import { newBrandColors, toolColors, objectiveColors } from './foundations/theme';

// Sidebar components with responsive updates
export const SidebarSection = styled.div<{ itemType?: 'tool' | 'objective' }>`
  padding: 15px;
  border-radius: 8px;
  background-color: ${props => 
    props.itemType === 'objective' 
      ? objectiveColors.inactiveHoverBg
      : toolColors.inactiveHoverBg};

  ${media.tablet} {
    padding: 12px;
  }

  ${media.mobile} {
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
`;

export const ToolList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  ${media.mobile} {
    overflow-y: auto;
    flex: 1;
  }
`;

export const ToolListItem = styled.li<{ active: boolean; itemType?: 'tool' | 'objective' }>`
  padding: 8px 12px;
  margin: 4px 0;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '600' : '400'};
  
  background-color: ${props => 
    props.active 
      ? (props.itemType === 'objective' ? objectiveColors.activeBg : toolColors.activeBg) 
      : 'transparent'};
  color: ${props => 
    props.active 
      ? (props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary) 
      : newBrandColors.charcoal};
  
  &:hover {
    background-color: ${props => 
      props.active 
        ? (props.itemType === 'objective' ? objectiveColors.activeHoverBg : toolColors.activeHoverBg) 
        : (props.itemType === 'objective' ? objectiveColors.inactiveHoverBg : toolColors.inactiveHoverBg)};
    transform: scale(1.01);
  }

  ${media.tablet} {
    padding: 6px 10px;
    font-size: 0.9rem;
  }

  ${media.mobile} {
    padding: 8px 12px;
    margin: 6px 0;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  ${media.tablet} {
    margin-bottom: 16px;
    gap: 8px;
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const ItemTypeIndicator = styled.span<{ itemType?: 'tool' | 'objective' }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #FFFFFF;
  background-color: ${props => 
    props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary};

  ${media.tablet} {
    padding: 3px 8px;
    font-size: 0.7rem;
  }
`;

export const TagContainer = styled.div<{ variant?: 'filter' }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.variant === 'filter' ? '4px' : '8px'};
  margin-top: ${props => props.variant === 'filter' ? '0' : '12px'};

  ${props => props.variant === 'filter' && `
    align-items: baseline;
    
    ${media.mobile} {
      margin-top: 8px;
    }
  `}
`;

export const Tag = styled.span<{ itemType?: 'tool' | 'objective'; variant?: 'filter'; onClick?: () => void }>`
  background-color: ${props => 
    props.itemType === 'objective' && props.variant !== 'filter'
      ? objectiveColors.tagBackground 
      : toolColors.tagBackground};
  color: ${props => 
    props.itemType === 'objective' && props.variant !== 'filter'
      ? objectiveColors.primary 
      : toolColors.primary};
  padding: ${props => props.variant === 'filter' ? '3px 7px' : '6px 12px'};
  border-radius: ${props => props.variant === 'filter' ? '4px' : '16px'};
  font-size: ${props => props.variant === 'filter' ? '0.75rem' : '0.9rem'};
  font-weight: ${props => props.variant === 'filter' ? '400' : '500'};
  transition: all 0.2s ease;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};

  &:hover {
    background-color: ${props => 
      props.onClick 
        ? (props.itemType === 'objective' && props.variant !== 'filter' ? objectiveColors.activeHoverBg : toolColors.activeHoverBg) 
        : (props.itemType === 'objective' && props.variant !== 'filter' ? objectiveColors.tagBackground : toolColors.tagBackground)};
  }

  ${media.tablet} {
    font-size: ${props => props.variant === 'filter' ? '0.7rem' : '0.8rem'};
    padding: ${props => props.variant === 'filter' ? '2px 6px' : '4px 10px'};
  }
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  .tooltiptext {
    visibility: hidden;
    width: 220px;
    background-color: ${newBrandColors.charcoal};
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    z-index: 1000;
    bottom: 125%;
    left: 50%;
    margin-left: -110px;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 0.8rem;
    line-height: 1.4;

    ${media.tablet} {
      width: 180px;
      margin-left: -90px;
      font-size: 0.75rem;
    }

    ${media.mobile} {
      width: 250px;
      margin-left: -125px;
      font-size: 0.8rem;
      bottom: 150%;
      /* Better positioning for mobile - above the tag */
      position: absolute;
    }
  }

  .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${newBrandColors.charcoal} transparent transparent transparent;
  }

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;

    ${media.mobile} {
      /* Don't show on hover on mobile - only on click */
      visibility: hidden;
      opacity: 0;
    }
  }

  /* Mobile click functionality */
  &.mobile-active .tooltiptext {
    ${media.mobile} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const TargetabilityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-top: 15px;
  }
`;

export const TargetabilityBox = styled.div`
  padding: 20px;
  border: 1px solid ${newBrandColors.lightBlue}50;
  border-radius: 8px;
  background-color: ${newBrandColors.beige}80;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${newBrandColors.lightBlue}70;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  strong {
    display: inline;
    color: ${newBrandColors.darkGreen};
    margin-right: 6px;
    font-weight: 600;
  }

  p {
    margin: 0;
    display: inline;
    color: ${newBrandColors.charcoal};
    line-height: 1.5;
    opacity: 0.8;
  }

  ${media.tablet} {
    padding: 16px;
  }

  ${media.mobile} {
    padding: 12px;
  }
`;

export const ToolLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
`;

export const ToolLinkListItem = styled.li`
  margin-bottom: 8px;
`;

export const ToolLink = styled.span`
  color: ${newBrandColors.darkGreen}; 
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: ${newBrandColors.brightGreen}; 
  }
`;

// Filter components with responsive updates
export const FilterBarContainer = styled.div`
  padding: 10px 0;
  margin-bottom: 10px;

  ${media.mobile} {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
    padding: 10px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 2px solid ${newBrandColors.lightBlue}50;
  font-size: 0.9rem;
  box-sizing: border-box;
  color: ${newBrandColors.charcoal};
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${toolColors.primary};
    box-shadow: 0 0 0 3px ${toolColors.activeBg};
  }

  ${media.tablet} {
    padding: 8px 10px;
    font-size: 0.85rem;
  }
`;

export const FilterChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 0;

  ${media.mobile} {
    gap: 4px;
  }
`;

export const FilterChip = styled.span`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, ${newBrandColors.darkBlue} 0%, ${newBrandColors.darkGreen} 100%);
  color: ${newBrandColors.beige};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;

  ${media.tablet} {
    font-size: 0.75rem;
    padding: 3px 6px;
  }
`;

export const RemoveChipButton = styled.button`
  background: none;
  border: none;
  color: ${newBrandColors.beige};
  margin-left: 6px;
  padding: 0;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  font-weight: 700;

  &:hover {
    color: ${newBrandColors.lightRed};
  }

  ${media.tablet} {
    font-size: 0.9rem;
    margin-left: 4px;
  }
`;

export const ClearFiltersButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${toolColors.primary};
  padding: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
  margin-top: 8px;
  display: inline-block;

  &:hover {
    color: ${objectiveColors.primary};
    background-color: transparent;
  }

  ${media.tablet} {
    font-size: 0.7rem;
  }
`;

// Top banner components with responsive updates
export const TopBannerContainer = styled.header`
  background: ${newBrandColors.charcoal};
  color: ${newBrandColors.beige};
  text-align: center;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: ${newBrandColors.brightGreen};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ${media.tablet} {
    padding: 0.4rem;
    
    /* Hide on mobile for non-homepage */
    &.hide-on-mobile {
      display: none;
    }
  }

  ${media.mobile} {
    padding: 0.3rem;
    
    /* Hide on mobile for non-homepage */
    &.hide-on-mobile {
      display: none;
    }
  }
`;

export const TopBannerText = styled.p`
  margin: 0;
  font-size: 0.75rem;

  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }

  ${media.tablet} {
    font-size: 0.7rem;
  }

  ${media.mobile} {
    font-size: 0.65rem;
    
    &:not(:last-child) {
      margin-bottom: 0.15rem;
    }
  }
`;