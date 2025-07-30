import styled from 'styled-components';
import { media } from '../foundations/breakpoints';
import { newBrandColors, spacing } from '../foundations/theme';

// App-level containers
export const AppContainer = styled.div`
  background: ${newBrandColors.beige};
  min-height: 100vh;
  width: 100%;
`;

export const ContentRow = styled.div`
  display: flex;
  flex: 1;
  
  ${media.desktop} {
    overflow: visible; /* Allow sticky positioning on desktop */
  }
  
  ${media.tablet} {
    flex-direction: column;
    overflow: hidden; /* Keep hidden on mobile for sidebar behavior */
  }
`;

// Responsive grid system
export const ResponsiveGrid = styled.div<{ columns?: number; gap?: keyof typeof spacing }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  gap: ${props => spacing[props.gap || 'xl'].desktop};
  margin-top: ${spacing.lg.desktop};

  ${media.desktop} {
    gap: ${props => spacing[props.gap || 'xl'].mobile};
    margin-top: ${spacing.lg.mobile};
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: ${props => spacing[props.gap || 'lg'].mobile};
  }
`;

// Sidebar with mobile responsiveness
export const Sidebar = styled.nav<{ isOpen?: boolean }>`
  width: 300px;
  background-color: #FFFFFF;
  padding: 10px;
  border-right: 2px solid ${newBrandColors.lightBlue}50;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: fit-content;
  max-height: calc(100vh - 70px); /* Constrain max height */
  position: sticky;
  top: 70px; /* Stick below header */
  align-self: flex-start; /* Required for sticky in flex container */
  transition: transform 0.3s ease;

  ${media.desktop} {
    width: 280px;
  }

  ${media.tablet} {
    position: fixed;
    top: 70px;
    left: 0;
    width: 280px;
    height: calc(100vh - 70px);
    z-index: 999;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    box-shadow: ${props => props.isOpen ? '0 0 20px rgba(0, 0, 0, 0.3)' : 'none'};
  }

  ${media.mobile} {
    width: 100vw;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  }
`;

// Mobile sidebar overlay
export const SidebarOverlay = styled.div<{ isOpen?: boolean }>`
  display: none;
  
  ${media.tablet} {
    display: block;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 70px);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    opacity: ${props => props.isOpen ? 1 : 0};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
`;

// Mobile menu button
export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${newBrandColors.beige};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  ${media.tablet} {
    display: block;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${spacing.xl.desktop};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  > * {
    width: 100%;
    max-width: 850px;
  }

  ${media.desktop} {
    padding: ${spacing.lg.mobile};
  }

  ${media.tablet} {
    padding: ${spacing.md.mobile};
    max-width: none;
    
    > * {
      max-width: none;
    }
  }
`;

// Section containers
export const Section = styled.section<{ variant?: 'filter'; color?: 'red' | 'blue' | 'green' }>`
  margin-bottom: ${props => props.variant === 'filter' ? spacing.lg.desktop : spacing['2xl'].desktop};
  border: 1px solid ${props => props.variant === 'filter' ? newBrandColors.lightBlue + '40' : newBrandColors.lightBlue + '50'};
  border-radius: ${props => props.variant === 'filter' ? '8px' : '12px'};
  padding: ${props => props.variant === 'filter' ? spacing.md.desktop : spacing.xl.desktop};
  box-shadow: ${props => props.variant === 'filter' ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  background-color: ${props => 
    props.variant === 'filter' ? newBrandColors.beige + '80' :
    props.color === 'red' ? newBrandColors.deepRed + '20' :
    props.color === 'blue' ? newBrandColors.lightBlue + '50' :
    props.color === 'green' ? newBrandColors.brightGreen + '20' :
    '#ffffff'};
  
  border-left: ${props =>
    props.color === 'red' ? `10px solid ${newBrandColors.deepRed}` :
    props.color === 'blue' ? `10px solid ${newBrandColors.darkBlue}` :
    props.color === 'green' ? `10px solid ${newBrandColors.darkGreen}` :
    'none'};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${props => props.variant === 'filter' ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.08)'};
    border-color: ${props => props.variant === 'filter' ? 
      newBrandColors.lightBlue + '60' : 
      props.color === 'red' ? newBrandColors.lightRed :
      props.color === 'blue' ? newBrandColors.lightBlue :
      props.color === 'green' ? newBrandColors.brightGreen:
      newBrandColors.lightBlue + '70'};
  }

  ${media.tablet} {
    margin-bottom: ${props => props.variant === 'filter' ? spacing.md.mobile : spacing.xl.mobile};
    padding: ${props => props.variant === 'filter' ? spacing.sm.mobile : spacing.lg.mobile};
    border-radius: 8px;
  }
`;

export const SubSection = styled.div<{ variant?: 'filter' }>`
  margin-bottom: ${props => props.variant === 'filter' ? '4px' : spacing.lg.desktop};
  padding: ${props => props.variant === 'filter' ? '0px' : spacing.lg.desktop};
  border: ${props => props.variant === 'filter' ? 'none' : `1px solid ${newBrandColors.lightBlue}50`};
  border-radius: ${props => props.variant === 'filter' ? '4px' : '8px'};
  background-color: ${props => props.variant === 'filter' ? 'transparent' : `${newBrandColors.beige}80`};
  transition: all 0.2s ease;

  ${props => props.variant === 'filter' && `
    display: flex;
    align-items: baseline;
    
    ${media.mobile} {
      flex-direction: column;
      align-items: flex-start;
    }
  `}

  &:hover {
    background-color: ${props => props.variant === 'filter' ? 'transparent' : '#E6F0ED'};
  }

  ${media.tablet} {
    margin-bottom: ${props => props.variant === 'filter' ? '4px' : spacing.md.mobile};
    padding: ${props => props.variant === 'filter' ? '0px' : spacing.md.mobile};
  }
`;

// Container components
export const Container = styled.div<{ maxWidth?: string }>`
  max-width: ${props => props.maxWidth || '900px'};
  margin: 0 auto;
  padding: ${spacing.xl.desktop};
  padding-top: ${spacing.xl.desktop};

  ${media.tablet} {
    padding: ${spacing.lg.mobile};
    padding-top: ${spacing.lg.mobile};
    max-width: none;
  }

  ${media.mobile} {
    padding: ${spacing.md.mobile};
    padding-top: ${spacing.md.mobile};
  }
`;

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: ${spacing.xl.desktop};
  box-sizing: border-box;

  ${media.tablet} {
    padding: ${spacing.lg.mobile};
  }

  ${media.mobile} {
    padding: ${spacing.md.mobile};
  }
`;