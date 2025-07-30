import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../styles/foundations/theme';
import { media } from '../styles/foundations/breakpoints';

const FooterContainer = styled.footer`
  background: ${newBrandColors.charcoal};
  color: ${newBrandColors.beige};
  padding: 2rem 0 1rem 0;
  margin-top: auto;
  width: 100%;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  
  ${media.tablet} {
    padding: 0 1.5rem;
  }
  
  ${media.mobile} {
    padding: 0 1rem;
  }
`;

const FooterLogo = styled.img`
  height: 60px;
  width: auto;
  opacity: 0.9;
  
  ${media.tablet} {
    height: 50px;
  }
  
  ${media.mobile} {
    height: 40px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  ${media.mobile} {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  color: ${newBrandColors.beige};
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.7;
  border-top: 1px solid ${newBrandColors.beige}20;
  padding-top: 1rem;
  width: 100%;
  
  a {
    color: ${newBrandColors.beige};
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
`;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo src="/logo_transp.png" alt="Centre for British Progress" />
        
        <FooterLinks>
          <FooterLink href="https://britishprogress.org" target="_blank" rel="noopener noreferrer">
            Centre for British Progress
          </FooterLink>
          <FooterLink href="https://britishprogress.org/contact" target="_blank" rel="noopener noreferrer">
            Contact
          </FooterLink>
          <FooterLink href="https://britishprogress.org/about" target="_blank" rel="noopener noreferrer">
            About
          </FooterLink>
        </FooterLinks>
        
        <Copyright>
          © {currentYear} Centre for British Progress. All rights reserved.<br />
          Content by Helen Ewles, Sanjush Dalmia, Pedro Serôdio and Ben Johnson for <a href="https://britishprogress.org" target="_blank" rel="noopener noreferrer">Centre for British Progress</a>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};