import styled from 'styled-components';
import { media } from '../foundations/breakpoints';
import { newBrandColors, spacing } from '../foundations/theme';

export const MobileToolbar = styled.div`
  display: none;
  
  ${media.tablet} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${newBrandColors.beige};
    border-bottom: 2px solid ${newBrandColors.lightBlue}30;
    padding: ${spacing.sm.mobile};
    position: sticky;
    top: 70px; /* Below header height */
    z-index: 100; /* Below header (1000) but above content */
    height: 50px; /* Fixed height for mobile toolbar */
  }
`;

export const MobileToolbarTitle = styled.h2`
  color: ${newBrandColors.charcoal};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

export const MobileToolbarButton = styled.button`
  background: linear-gradient(135deg, ${newBrandColors.darkGreen}, ${newBrandColors.darkBlue});
  color: ${newBrandColors.beige};
  border: none;
  border-radius: 6px;
  padding: ${spacing.sm.mobile} ${spacing.md.mobile};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, ${newBrandColors.brightGreen}, ${newBrandColors.lightBlue});
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid ${newBrandColors.lightBlue};
    outline-offset: 2px;
  }
`;

export const MobileSidebarContainer = styled.div`
  display: none;
  
  ${media.tablet} {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 120px; /* Below header (70px) + mobile toolbar (50px) */
    left: 0;
    width: 80vw;
    max-width: 350px;
    height: calc(100vh - 120px); /* Full height minus header and toolbar */
    background: white;
    z-index: 50; /* Below header (1000) and toolbar (100) but above content */
    transform: translateX(-100%);
    animation: slideInFromLeft 0.3s ease forwards;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  }

  @keyframes slideInFromLeft {
    to {
      transform: translateX(0);
    }
  }

  ${media.mobile} {
    width: 100vw;
    max-width: none;
  }
`;

export const MobileSidebarOverlay = styled.div`
  display: none;
  
  ${media.tablet} {
    display: block;
    position: fixed;
    top: 120px; /* Below header (70px) + mobile toolbar (50px) */
    left: 0;
    width: 100vw;
    height: calc(100vh - 120px); /* Full height minus header and toolbar */
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 49; /* Behind sidebar but above content */
  }
`;

export const MobileSidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.md.mobile};
  background: ${newBrandColors.lightBlue}20;
  border-bottom: 2px solid ${newBrandColors.lightBlue}30;
  z-index: 5; /* Within sidebar, above content */
`;

export const MobileSidebarTitle = styled.h2`
  color: ${newBrandColors.charcoal};
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

export const MobileSidebarCloseButton = styled.button`
  background: ${newBrandColors.darkGreen};
  color: ${newBrandColors.beige};
  border: none;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${newBrandColors.brightGreen};
    color: ${newBrandColors.charcoal};
  }

  &:focus {
    outline: 2px solid ${newBrandColors.lightBlue};
    outline-offset: 2px;
  }
`;

export const MobileSidebarContent = styled.div`
  padding: ${spacing.sm.mobile};
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;