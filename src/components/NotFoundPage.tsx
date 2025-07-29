import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { newBrandColors } from '../styles/foundations/theme';
import { media } from '../styles/foundations/breakpoints';
import { Page } from './Page';
import { Container, Section } from '../styles/StyledComponents';
import { MainCard } from '../styles/components/Calculator';

const NotFoundContainer = styled(Container)`
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorNumber = styled.h1`
  font-size: 8rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, ${newBrandColors.darkGreen}, ${newBrandColors.darkBlue});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  text-align: center;
  
  ${media.tablet} {
    font-size: 6rem;
  }
  
  ${media.mobile} {
    font-size: 4rem;
  }
`;

const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
  width: 100%;
  padding: 3rem 2rem;
  
  ${media.tablet} {
    padding: 2rem 1.5rem;
  }
  
  ${media.mobile} {
    padding: 1.5rem 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const StyledButton = styled(Link)<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, ${newBrandColors.darkGreen}, ${newBrandColors.darkBlue});
    color: ${newBrandColors.beige};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
  ` : `
    background: ${newBrandColors.lightBlue}20;
    color: ${newBrandColors.darkBlue};
    border: 2px solid ${newBrandColors.lightBlue}50;
    
    &:hover {
      background: ${newBrandColors.lightBlue}30;
      border-color: ${newBrandColors.lightBlue}70;
      transform: translateY(-1px);
    }
  `}
  
  ${media.mobile} {
    padding: 0.625rem 1.5rem;
    font-size: 0.9rem;
  }
`;

export const NotFoundPage: React.FC = () => {
  return (
    <Page 
      title="Page Not Found" 
      subtitle="The page you're looking for doesn't exist"
    >
      <NotFoundContainer>
        <MainCard>
          <NotFoundContent>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.6 }}>
              🧭
            </div>
            
            <ErrorNumber>404</ErrorNumber>
            
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 700, 
              color: newBrandColors.charcoal, 
              margin: '0 0 1rem 0' 
            }}>
              Page Not Found
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: newBrandColors.charcoal,
              lineHeight: 1.6,
              margin: '0 0 2rem 0',
              opacity: 0.8
            }}>
              The page you're looking for doesn't exist or may have been moved. 
              Let's get you back on track with our innovation policy toolkit.
            </p>
            
            <Section variant="filter">
              <strong style={{ color: newBrandColors.darkBlue, display: 'block', marginBottom: '0.5rem' }}>
                Popular destinations:
              </strong>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', textAlign: 'left' }}>
                <li>Browse policy tools and their effectiveness</li>
                <li>Use the R&D investment calculator</li>
                <li>Read research and case studies</li>
              </ul>
            </Section>
            
            <ButtonGroup>
              <StyledButton to="/" $variant="primary">
                🏠 Back to Home
              </StyledButton>
              <StyledButton to="/toolkit" $variant="secondary">
                🔧 Browse Toolkit
              </StyledButton>
              <StyledButton to="/calculator" $variant="secondary">
                🧮 Calculator
              </StyledButton>
            </ButtonGroup>
          </NotFoundContent>
        </MainCard>
      </NotFoundContainer>
    </Page>
  );
};