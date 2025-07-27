import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/theme';
import { IntroductionSection } from './IntroductionSection';
import { GeneralFrameworkSection } from './GeneralFrameworkSection';
import { PrivateRDSection } from './PrivateRDSection';
import { PublicRDSection } from './PublicRDSection';

const ReadingContainer = styled.div`
  background: ${newBrandColors.beige};
  min-height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 2rem;
`;

const Navigation = styled.nav`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${newBrandColors.lightBlue}30;
`;

const NavTitle = styled.h3`
  color: ${newBrandColors.charcoal};
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;

const NavLink = styled.a`
  color: ${newBrandColors.darkBlue};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${newBrandColors.brightGreen};
    text-decoration: underline;
  }
`;

export const FurtherReadingPage: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ReadingContainer>
      <Container>
        <Navigation>
          <NavTitle>Contents</NavTitle>
          <NavList>
            <NavItem>
              <NavLink href="#introduction" onClick={(e) => { e.preventDefault(); scrollToSection('introduction'); }}>
                Introduction
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#framework" onClick={(e) => { e.preventDefault(); scrollToSection('framework'); }}>
                General Framework for R&D Returns
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#private" onClick={(e) => { e.preventDefault(); scrollToSection('private'); }}>
                Private R&D Returns
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#public" onClick={(e) => { e.preventDefault(); scrollToSection('public'); }}>
                Public R&D and Private-Public R&D Leveraging
              </NavLink>
            </NavItem>
          </NavList>
        </Navigation>

        <IntroductionSection />
        <GeneralFrameworkSection />
        <PrivateRDSection />
        <PublicRDSection />
      </Container>
    </ReadingContainer>
  );
}; 