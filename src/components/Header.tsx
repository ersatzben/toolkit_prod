import React, { useState } from 'react';
import {
  StickyHeader,
  LogoContainer,
  HeaderGradient,
  HeaderLogo,
  HeaderTitle,
  HeaderTitleContainer,
  HeaderSubtitle,
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
  MobileMenuCloseButton,
} from '../styles/StyledComponents';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <StickyHeader>
      <LogoContainer>
        <a href="https://britishprogress.org" target="_blank" rel="noopener noreferrer">
          <HeaderLogo src="/logo.png" alt="Centre for British Progress Logo" />
        </a>
      </LogoContainer>
      <HeaderGradient>
        <HeaderTitleContainer>
          <HeaderTitle>UK R&D Policy Toolkit</HeaderTitle>
          {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
        </HeaderTitleContainer>
        <HeaderNav>
          <HeaderNavLink href="/">
            <HomeIcon>🏠</HomeIcon>
            Home
          </HeaderNavLink>
          <HeaderNavLink href="/contact">Contact</HeaderNavLink>
        </HeaderNav>
        <MobileMenuButton onClick={() => setMobileNavOpen(!mobileNavOpen)}>
          ☰
        </MobileMenuButton>
      </HeaderGradient>
      <MobileNavOverlay isOpen={mobileNavOpen} onClick={() => setMobileNavOpen(false)} />
      <MobileNavMenu isOpen={mobileNavOpen}>
        <MobileMenuHeader>
          <MobileMenuTitle>Menu</MobileMenuTitle>
          <MobileMenuCloseButton onClick={() => setMobileNavOpen(false)}>
            ×
          </MobileMenuCloseButton>
        </MobileMenuHeader>
        <MobileNavList>
          <MobileNavItem>
            <MobileNavLink href="/" onClick={() => setMobileNavOpen(false)}>🏠 Home</MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/contact" onClick={() => setMobileNavOpen(false)}>Contact</MobileNavLink>
          </MobileNavItem>
        </MobileNavList>
      </MobileNavMenu>
    </StickyHeader>
  );
}; 