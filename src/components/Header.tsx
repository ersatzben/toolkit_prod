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
  onFrameworkSectionClick?: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onFrameworkSectionClick }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isCalculatorPage, setIsCalculatorPage] = useState(false);

  // Check if we're on calculator page (client-side only)
  React.useEffect(() => {
    setIsCalculatorPage(window.location.pathname === '/calculator');
  }, []);

  return (
    <StickyHeader>
      <LogoContainer>
        <a href="https://britishprogress.org" target="_blank" rel="noopener noreferrer">
          <HeaderLogo src="/logo.png" alt="Centre for British Progress Logo" />
        </a>
      </LogoContainer>
      <HeaderGradient>
        <HeaderTitleContainer>
          <HeaderTitle>{title}</HeaderTitle>
          {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
        </HeaderTitleContainer>
        <HeaderNav>
          <HeaderNavLink href="/">
            <HomeIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </HomeIcon>
          </HeaderNavLink>
          <MobileMenuButton onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </MobileMenuButton>
        </HeaderNav>
      </HeaderGradient>
      <MobileNavOverlay $isOpen={mobileNavOpen} onClick={() => setMobileNavOpen(false)} />
      <MobileNavMenu $isOpen={mobileNavOpen}>
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
            <MobileNavLink href="/toolkit" onClick={() => setMobileNavOpen(false)}>🔧 Toolkit</MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/calculator" onClick={() => setMobileNavOpen(false)}>🧮 Calculator</MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/reading" onClick={() => setMobileNavOpen(false)}>📚 Further Reading</MobileNavLink>
          </MobileNavItem>
          {isCalculatorPage && onFrameworkSectionClick && (
            <>
              <MobileNavItem style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
                <div style={{ padding: '0.5rem 1rem', fontWeight: 'bold', color: '#666' }}>Research Background:</div>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onFrameworkSectionClick('theoreticalFramework');
                    setMobileNavOpen(false);
                  }}
                >
                  📖 Theoretical Framework
                </MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onFrameworkSectionClick('empiricalEvidence');
                    setMobileNavOpen(false);
                  }}
                >
                  📊 Empirical Evidence
                </MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onFrameworkSectionClick('technicalMethodology');
                    setMobileNavOpen(false);
                  }}
                >
                  🔬 Technical Methodology
                </MobileNavLink>
              </MobileNavItem>
            </>
          )}
          <MobileNavItem style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
            <MobileNavLink href="https://britishprogress.org/contact" target="_blank" rel="noopener noreferrer" onClick={() => setMobileNavOpen(false)}>📧 Contact</MobileNavLink>
          </MobileNavItem>
        </MobileNavList>
      </MobileNavMenu>
    </StickyHeader>
  );
}; 