import React, { useState } from 'react';
import {
  StickyHeader,
  HeaderGradient,
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
import { HeaderContent } from '../styles/components/Header';

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
      <HeaderGradient>
        <HeaderContent>
          <HeaderTitleContainer>
            <HeaderTitle>
              <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                {title}
              </a>
            </HeaderTitle>
            {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
          </HeaderTitleContainer>
          <HeaderNav>
            <HeaderNavLink href="https://britishprogress.org">
              <HomeIcon>
                <svg width="20" height="20" viewBox="110 110 180 180" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M188.501 217.9L182.217 211.559L192.954 200.906L201.61 203.91L188.54 217.906L199.815 286.093L212.731 212.494L286.346 199.568L218.11 188.268L218.111 188.266L218.053 188.258L212.722 187.376L211.819 182.234L211.777 181.943L211.77 181.951L199.821 113.906L187.649 187.409L114.159 199.562L182.227 211.506L127.359 266.399L138.505 267.935L188.501 217.9ZM272.181 134.154L226.744 179.626L220.078 173.638L261.934 131.763L272.181 134.154Z"/>
                </svg>
              </HomeIcon>
            </HeaderNavLink>
            <MobileMenuButton onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </MobileMenuButton>
          </HeaderNav>
        </HeaderContent>
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
            <MobileNavLink href="/toolkit" onClick={() => setMobileNavOpen(false)}>🔧 Learn about R&D</MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/reading" onClick={() => setMobileNavOpen(false)}>📚 Guide to evaluating</MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink href="/calculator" onClick={() => setMobileNavOpen(false)}>🧮 Calculator</MobileNavLink>
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