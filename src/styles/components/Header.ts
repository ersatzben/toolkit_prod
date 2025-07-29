import styled from 'styled-components';
import { media } from '../foundations/breakpoints';
import { newBrandColors } from '../foundations/theme';

const headerHeight = '70px';

export const StickyHeader = styled.header`
  color: ${newBrandColors.beige};
  height: ${headerHeight};
  display: flex;
  align-items: stretch;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${newBrandColors.darkGreen};
  padding: 0 25px;

  ${media.tablet} {
    padding: 0 15px;
  }

  ${media.mobile} {
    display: none; /* Hide logo container entirely on mobile */
  }
`;

export const HeaderLogo = styled.img`
  height: 70px;
  margin-right: 15px;
  display: block;

  ${media.tablet} {
    height: 60px;
    margin-right: 10px;
  }

  ${media.mobile} {
    height: 50px;
    margin-right: 8px;
  }
`;

export const HeaderGradient = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, ${newBrandColors.darkGreen} 0%, ${newBrandColors.darkBlue} 100%);
  padding: 0 25px;

  ${media.tablet} {
    padding: 0 15px;
  }

  ${media.mobile} {
    padding: 0 10px;
    /* On mobile, logo is hidden so gradient takes full width */
    background: ${newBrandColors.darkGreen}; /* Solid color instead of gradient for simplicity */
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: auto;

  ${media.tablet} {
    gap: 12px;
  }

  ${media.mobile} {
    gap: 10px;
  }
`;

export const HeaderNavLink = styled.a`
  color: ${newBrandColors.beige};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: ${newBrandColors.brightGreen};
    text-decoration: underline;
  }

  ${media.tablet} {
    font-size: 0.85rem;
  }

  ${media.mobile} {
    font-size: 0.8rem;
  }
`;

export const HomeIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  
  svg {
    width: 20px;
    height: 20px;
    
    ${media.tablet} {
      width: 18px;
      height: 18px;
    }
    
    ${media.mobile} {
      width: 16px;
      height: 16px;
    }
  }
`;

// Mobile menu components
export const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${newBrandColors.beige};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${newBrandColors.brightGreen};
    background-color: ${newBrandColors.lightBlue}20;
  }

  &:focus {
    outline: 2px solid ${newBrandColors.lightBlue};
    outline-offset: 2px;
  }
`;

export const MobileNavMenu = styled.div<{ $isOpen?: boolean }>`
  display: block;
  position: fixed;
  top: ${headerHeight};
  right: 0;
  background: linear-gradient(180deg, ${newBrandColors.darkBlue} 0%, ${newBrandColors.darkGreen} 100%);
  border-radius: 0 0 0 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 1001;
  min-width: 200px;

  ${media.mobile} {
    padding: 15px;
    min-width: 180px;
    max-width: 250px;
  }
`;

export const MobileNavOverlay = styled.div<{ $isOpen?: boolean }>`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const MobileNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MobileNavItem = styled.li`
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const MobileNavLink = styled.a`
  color: ${newBrandColors.beige};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  display: block;
  padding: 8px 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${newBrandColors.brightGreen};
  }
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${newBrandColors.lightBlue}40;
`;

export const MobileMenuTitle = styled.h3`
  color: ${newBrandColors.beige};
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`;

export const MobileMenuCloseButton = styled.button`
  background: none;
  border: none;
  color: ${newBrandColors.beige};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${newBrandColors.lightBlue}20;
    color: ${newBrandColors.brightGreen};
  }

  &:focus {
    outline: 2px solid ${newBrandColors.lightBlue};
    outline-offset: 2px;
  }
`;