import styled from '@emotion/styled';
import { newBrandColors } from './theme';

// Define color variables for better maintainability
const toolColors = {
  primary: newBrandColors.darkGreen,
  activeBg: newBrandColors.brightGreen + '20',
  activeHoverBg: newBrandColors.brightGreen + '30',
  inactiveHoverBg: newBrandColors.lightBlue + '15',
  tagBackground: newBrandColors.brightGreen + '20',
};

const objectiveColors = {
  primary: newBrandColors.darkBlue,
  activeBg: newBrandColors.lightBlue + '30',
  activeHoverBg: newBrandColors.lightBlue + '40',
  inactiveHoverBg: newBrandColors.lightBlue + '15',
  tagBackground: newBrandColors.lightBlue + '30',
};

const brandColors = {
  darkGreen: newBrandColors.darkGreen,
  beige: newBrandColors.beige,
  charcoal: newBrandColors.charcoal,
};

const headerHeight = '70px';

export const AppContainer = styled.div`
  background: ${newBrandColors.beige};
  min-height: 100vh;
  width: 100%;
`;

// New component to wrap Sidebar and MainContent, enabling them to scroll independently under a sticky header
export const ContentRow = styled.div`
  display: flex;
  flex: 1; // Takes remaining height after header
  overflow: hidden; // Children will handle their own scroll
`;

export const StickyHeader = styled.header`
  color: ${brandColors.beige};
  height: ${headerHeight};
  display: flex; // Use flexbox to layout children
  align-items: stretch; // Stretch children to fill height
  position: sticky;
  top: 0;
  z-index: 1000; // Ensure header stays on top
  width: 100%;
  box-sizing: border-box;
  padding: 0; // Remove padding from the main container
`;

export const HeaderLogo = styled.img`
  height: 70px; // Changed from 40px to fill header
  margin-right: 15px;
  display: block; // Add display: block to remove extra space under the image
`;

export const HeaderTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${brandColors.beige};
  margin: 0;
  // Remove absolute positioning to work within the new flex layout
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-left: auto; // Push nav to the right
`;

export const HeaderNavLink = styled.a`
  color: ${brandColors.beige};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${newBrandColors.brightGreen};
    text-decoration: underline;
  }
`;

// Was HeaderSection, now repurposed for the logo
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${newBrandColors.darkGreen}; // Solid color for the logo area
  padding: 0 25px; // Keep padding here
`;

// New component for the gradient part of the header
export const HeaderGradient = styled.div`
  flex-grow: 1; // Takes up the remaining space
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, ${newBrandColors.darkGreen} 0%, ${newBrandColors.darkBlue} 100%);
  padding: 0 25px;
`;

export const Sidebar = styled.nav`
  width: 300px;
  background-color: #FFFFFF;
  padding: 10px;
  border-right: 2px solid ${newBrandColors.lightBlue}50;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%; // Ensure sidebar can scroll within ContentRow
`;

export const SidebarSection = styled.div<{ itemType?: 'tool' | 'objective' }>`
  padding: 15px;
  border-radius: 8px;
  background-color: ${props => 
    props.itemType === 'objective' 
      ? objectiveColors.inactiveHoverBg // Light blue for objectives section
      : toolColors.inactiveHoverBg}; // Light green for tools section
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%; // Ensure main content can scroll within ContentRow

  > * {
    width: 100%;
    max-width: 850px;
  }
`;

export const ToolList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
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
`;

// variant prop type for components that can have a 'filter' style
type ComponentVariant = 'filter';

export const Section = styled.section<{ variant?: ComponentVariant }>`
  margin-bottom: ${props => props.variant === 'filter' ? '20px' : '32px'};
  border: 1px solid ${props => props.variant === 'filter' ? newBrandColors.lightBlue + '40' : newBrandColors.lightBlue + '50'};
  border-radius: ${props => props.variant === 'filter' ? '8px' : '12px'};
  padding: ${props => props.variant === 'filter' ? '10px' : '28px'};
  box-shadow: ${props => props.variant === 'filter' ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  background-color: ${props => props.variant === 'filter' ? newBrandColors.beige + '80' : '#ffffff'};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${props => props.variant === 'filter' ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.08)'};
    border-color: ${props => props.variant === 'filter' ? newBrandColors.lightBlue + '60' : newBrandColors.lightBlue + '70'};
  }
`;

export const SectionTitle = styled.h2<{ itemType?: 'tool' | 'objective'; variant?: ComponentVariant }>`
  color: ${props => props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary};
  margin-bottom: ${props => props.variant === 'filter' ? '16px' : '24px'};
  font-size: ${props => props.variant === 'filter' ? '1.1rem' : '1.6rem'}; // Smaller for filter
  font-weight: ${props => props.variant === 'filter' ? '500' : '600'};
  padding-bottom: ${props => props.variant === 'filter' ? '8px' : '16px'};
  border-bottom: 1px solid ${props => props.variant === 'filter' ? newBrandColors.lightBlue + '40' : newBrandColors.brightGreen + '30'};
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
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
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  color: ${newBrandColors.charcoal};
`;

export const SidebarTitle = styled.h2<{ itemType?: 'tool' | 'objective' }>`
  font-size: 1.2em;
  margin-top: 0;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid ${newBrandColors.lightBlue}50;
  color: ${(props) => (props.itemType === 'tool' ? toolColors.primary : objectiveColors.primary)};
  cursor: pointer;
`;

export const SidebarSubheading = styled.h3`
  font-size: 0.9em;
  font-weight: 800;
  margin-top: 10px;
  margin-bottom: 5px;
  padding-left: 8px;
  color: ${objectiveColors.primary};
`;

export const SubSection = styled.div<{ variant?: ComponentVariant }>`
  margin-bottom: ${props => props.variant === 'filter' ? '4px' : '24px'}; // Changed filter margin-bottom from 8px to 4px
  padding: ${props => props.variant === 'filter' ? '0px' : '20px'};
  border: ${props => props.variant === 'filter' ? 'none' : `1px solid ${newBrandColors.lightBlue}50`};
  border-radius: ${props => props.variant === 'filter' ? '4px' : '8px'};
  background-color: ${props => props.variant === 'filter' ? 'transparent' : `${newBrandColors.beige}80`};
  transition: all 0.2s ease;

  ${props => props.variant === 'filter' && `
    display: flex;
    align-items: baseline; // Align title text with the first line of tags
  `}

  &:hover {
    background-color: ${props => props.variant === 'filter' ? 'transparent' : '#E6F0ED'};
  }
`;

export const SubSectionTitle = styled.h3<{ itemType?: 'tool' | 'objective'; variant?: ComponentVariant }>`
  color: ${props => props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary};
  margin-bottom: ${props => props.variant === 'filter' ? '0' : '16px'}; // Removed bottom margin for filter variant
  font-size: ${props => props.variant === 'filter' ? '0.9rem' : '1.25rem'};
  font-weight: ${props => props.variant === 'filter' ? '500' : '500'};

  ${props => props.variant === 'filter' && `
    margin-right: 8px; // Add right margin to separate title from tags
    flex-shrink: 0; // Prevent title from shrinking
  `}
`;

export const TagContainer = styled.div<{ variant?: ComponentVariant }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.variant === 'filter' ? '4px' : '8px'};
  margin-top: ${props => props.variant === 'filter' ? '0' : '12px'}; // Removed top margin for filter variant

  ${props => props.variant === 'filter' && `
    align-items: baseline; // Align tags with the title, especially if they wrap
  `}
`;

export const Tag = styled.span<{ itemType?: 'tool' | 'objective'; variant?: ComponentVariant; onClick?: () => void }>`
  background-color: ${props => 
    props.itemType === 'objective' && props.variant !== 'filter' // Objective context tags (not filter tags) are blue
      ? objectiveColors.tagBackground 
      : toolColors.tagBackground}; // Default to tool color (green)
  color: ${props => 
    props.itemType === 'objective' && props.variant !== 'filter'
      ? objectiveColors.primary 
      : toolColors.primary};
  padding: ${props => props.variant === 'filter' ? '3px 7px' : '6px 12px'}; // Smaller padding for filter
  border-radius: ${props => props.variant === 'filter' ? '4px' : '16px'}; // Less rounded for filter
  font-size: ${props => props.variant === 'filter' ? '0.75rem' : '0.9rem'}; // Smaller font for filter
  font-weight: ${props => props.variant === 'filter' ? '400' : '500'};
  transition: all 0.2s ease;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};

  &:hover {
    background-color: ${props => 
      props.onClick 
        ? (props.itemType === 'objective' && props.variant !== 'filter' ? objectiveColors.activeHoverBg : toolColors.activeHoverBg) 
        : (props.itemType === 'objective' && props.variant !== 'filter' ? objectiveColors.tagBackground : toolColors.tagBackground)};
    // Only change background on hover if it's clickable
  }
`;

export const TargetabilityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
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
`;

export const MarkdownText = styled.div<{ variant?: 'large' }>`
  p {
    margin-bottom: 1.2em;
    line-height: ${props => props.variant === 'large' ? '1.8' : '1.7'};
    color: ${newBrandColors.charcoal};
    opacity: 0.9;
    font-size: ${props => props.variant === 'large' ? '1.1rem' : '1rem'};
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    font-weight: 600;
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
    font-family: 'SF Mono', Menlo, Monaco, Consolas, monospace;
    font-size: 0.9em;
    color: ${newBrandColors.darkGreen};
  }
`;

export const FurtherReadingList = styled.ul`
  list-style-type: disc;
  padding-left: 25px;
  margin-top: 16px;
`;

export const FurtherReadingListItem = styled.li`
  margin-bottom: 12px;
  line-height: 1.6;
`;

export const FurtherReadingLink = styled.a`
  color: ${newBrandColors.darkBlue};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease, text-decoration 0.2s ease;

  &:hover,
  &:focus {
    color: ${newBrandColors.lightBlue};
    text-decoration: underline;
  }
`;

export const FurtherReadingText = styled.span`
  color: ${newBrandColors.charcoal};
  font-weight: 500;
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

export const FilterBarContainer = styled.div`
  padding: 10px 0; // Padding for the container itself
  margin-bottom: 10px; // Space below the filter bar
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 2px solid ${newBrandColors.lightBlue}50;
  font-size: 0.9rem;
  box-sizing: border-box;
  color: ${newBrandColors.charcoal};

  &:focus {
    outline: none;
    border-color: ${toolColors.primary};
    box-shadow: 0 0 0 3px ${toolColors.activeBg};
  }
`;

export const FilterChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 0; // Padding above and below chips, but not on sides if search input is 100%
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
`;

export const ClearFiltersButton = styled.button`
  background-color: transparent;
  border: none; // Remove border
  color: ${toolColors.primary}; // Use primary color for text
  padding: 4px; // Reduce padding
  font-size: 0.75rem; // Smaller font
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline; // Add underline to look like a link
  transition: color 0.2s ease;
  margin-top: 8px;
  display: inline-block; // To allow margin-top and ensure it doesn't take full width

  &:hover {
    color: ${objectiveColors.primary};
    background-color: transparent; // Ensure no background on hover
  }
`; 

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
`;

export const TopBannerText = styled.p`
  margin: 0;
  font-size: 0.75rem;

  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`; 