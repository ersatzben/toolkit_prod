import React from 'react';
import {
  StickyHeader,
  HeaderSection,
  HeaderLogo,
  HeaderTitle,
  HeaderNav,
  HeaderNavLink,
} from '../styles/StyledComponents';

interface HeaderProps {
  title: string;
  onBackToSplash: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onBackToSplash }) => {
  return (
    <StickyHeader>
      <HeaderSection>
        <a href="https://britishprogress.org" target="_blank" rel="noopener noreferrer">
          <HeaderLogo src="/logo.png" alt="Centre for British Progress Logo" />
        </a>
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderSection>
      <HeaderNav>
        <HeaderNavLink href="#" onClick={onBackToSplash}>← Back to Home</HeaderNavLink>
        
        <HeaderNavLink href="#">Contact</HeaderNavLink>
      </HeaderNav>
    </StickyHeader>
  );
}; 