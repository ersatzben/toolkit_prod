import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { newBrandColors } from '../styles/theme';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, ${newBrandColors.darkGreen} 0%, ${newBrandColors.darkBlue} 100%);
  padding: 2rem;
  box-sizing: border-box;
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  color: ${newBrandColors.beige};
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: ${newBrandColors.beige};
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  color: ${newBrandColors.beige};
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
  justify-content: center;
`;

const OptionCard = styled(Link)`
  flex: 1;
  background: ${newBrandColors.beige};
  border: 3px solid ${newBrandColors.lightBlue};
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  text-decoration: none;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
    border-color: ${newBrandColors.brightGreen};
    background: linear-gradient(135deg, ${newBrandColors.beige} 0%, ${newBrandColors.lightBlue}20 100%);
    text-decoration: none;
  }
  
  &:active {
    transform: translateY(-4px);
  }
`;

const OptionIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
`;

const OptionTitle = styled.h3`
  font-size: 1.5rem;
  color: ${newBrandColors.charcoal};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const OptionDescription = styled.p`
  font-size: 1rem;
  color: ${newBrandColors.charcoal};
  line-height: 1.5;
  margin: 0;
  opacity: 0.8;
`;

const DisclaimerText = styled.p`
  color: ${newBrandColors.beige};
  opacity: 0.9;
  text-align: center;
  font-size: 1rem;
  margin-top: 4rem;
  max-width: 600px;
  line-height: 1.6;

  a {
    color: ${newBrandColors.lightBlue};
    font-weight: 600;
  }
`;

const FooterSection = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LogoImage = styled.img`
  height: 60px;
  filter: brightness(0) invert(1);
`;

const FooterText = styled.p`
  color: ${newBrandColors.beige};
  opacity: 0.8;
  text-align: center;
  font-size: 0.9rem;
`;

export const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <WelcomeSection>
        <MainTitle>UK R&D Policy Toolkit</MainTitle>
        <Subtitle>
          Explore comprehensive resources for research and development policy, 
          from practical tools to investment analysis and evidence-based insights.
        </Subtitle>
      </WelcomeSection>
      
      <OptionsContainer>
        <OptionCard to="/toolkit">
          <OptionIcon>🔧</OptionIcon>
          <OptionTitle>Learn about R&D policy tools</OptionTitle>
          <OptionDescription>
            Discover and explore various policy instruments designed to support 
            R&D initiatives across different sectors and stages.
          </OptionDescription>
        </OptionCard>
        
        <OptionCard to="/calculator">
          <OptionIcon>📊</OptionIcon>
          <OptionTitle>Calculate return on investment from R&D</OptionTitle>
          <OptionDescription>
            Use our interactive calculator to assess the potential returns 
            and impact of R&D investments.
          </OptionDescription>
        </OptionCard>
        
        <OptionCard to="/reading">
          <OptionIcon>📚</OptionIcon>
          <OptionTitle>Guide to evaluating R&D returns</OptionTitle>
          <OptionDescription>
            A guide to evaluating the returns from R&D investments with research-backed frameworks.
          </OptionDescription>
        </OptionCard>
      </OptionsContainer>
      
      
    </PageContainer>
  );
}; 