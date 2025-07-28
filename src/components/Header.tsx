import React from 'react';
import {
  StickyHeader,
  LogoContainer,
  HeaderGradient,
  HeaderLogo,
  HeaderTitle,
  HeaderNav,
  HeaderNavLink,
} from '../styles/StyledComponents';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <StickyHeader>
      <LogoContainer>
        <a href="https://britishprogress.org" target="_blank" rel="noopener noreferrer">
          <HeaderLogo src="/logo.png" alt="Centre for British Progress Logo" />
        </a>
      </LogoContainer>
      <HeaderGradient>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderNav>
          <HeaderNavLink href="/">← Back to Home</HeaderNavLink>
          <HeaderNavLink href="/contact">Contact</HeaderNavLink>
        </HeaderNav>
      </HeaderGradient>
    </StickyHeader>
  );
}; 