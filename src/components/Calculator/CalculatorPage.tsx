import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/foundations/theme';
import type { TabType, PrivateRDParams, PublicRDParams, PrivateRDResults, PublicRDResults } from '../../types/Calculator';
import { PrivateRDForm } from './PrivateRDForm';
import { PublicRDForm } from './PublicRDForm';
import { InfoSection } from './InfoSection';
import { Page } from '../Page';

const CalculatorContainer = styled.div`
  background: ${newBrandColors.beige};
  min-height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 2rem;
`;

const MainCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  border: 2px solid ${newBrandColors.lightBlue}30;
`;

const Tabs = styled.div`
  display: flex;
  background: ${newBrandColors.lightBlue}20;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1.5rem 2rem;
  background: ${props => props.active ? 'white' : 'transparent'};
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  color: ${props => props.active ? newBrandColors.darkBlue : newBrandColors.charcoal};

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, ${newBrandColors.darkBlue}, ${newBrandColors.darkGreen});
    }
  `}

  &:not(.active):hover {
    background: rgba(255,255,255,0.5);
  }
`;

const TabContent = styled.div`
  padding: 2rem;
`;

export const CalculatorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('private');
  
  // Private R&D state
  const [privateParams, setPrivateParams] = useState<PrivateRDParams>({
    techSpillover: 0.231,
    productRivalry: -0.086,
    interestRate: 0.055,
    depreciationRate: 0.15
  });
  
  const [privateResults, setPrivateResults] = useState<PrivateRDResults>({
    bcr: 0,
    directProductivity: 0,
    competitiveGain: 0,
    spilloverGain: 0,
    privateTotal: 0,
    socialTotal: 0,
    uncapturedPublic: 0,
    ratio: 0
  });

  // Public R&D state
  const [publicParams, setPublicParams] = useState<PublicRDParams>({
    directReturn: 0.05,
    leverageRatio: 0.5,
    spilloverReturn: 0.45,
    interestRate: 0.055,
    depreciationRate: 0.15
  });

  const [publicResults, setPublicResults] = useState<PublicRDResults>({
    totalBCR: 0,
    publicBCR: 0,
    privateBCR: 0,
    leverageComponent: 0
  });

  // Calculation functions
  const calculatePrivateBCR = (params: PrivateRDParams): PrivateRDResults => {
    const psi2 = params.techSpillover;
    const gamma1 = params.productRivalry;
    const yg = 2.345;
    const psi1 = 0.015;
    const sigmaY = 0.5;
    const i = params.interestRate;
    const delta = params.depreciationRate;

    // Direct productivity gain (rate)
    const directProductivity = yg * psi1;
    // Business stealing (competitive gain)
    const competitiveGain = yg * sigmaY * Math.abs(gamma1);
    // Positive spillovers (rate)
    const spilloverGain = yg * psi2;
    // Private return
    const privateTotal = directProductivity + competitiveGain;
    // Social return (rate)
    const socialTotal = directProductivity + spilloverGain;
    // Uncaptured public value (spillovers minus business stealing)
    const uncapturedPublic = spilloverGain - competitiveGain;
    // Ratio
    const ratio = privateTotal !== 0 ? socialTotal / privateTotal : 0;
    // BCR (headline, total social return, present value)
    const multiplier = (1 + i) / (i + delta);
    const bcr = socialTotal * multiplier;

    return {
      bcr,
      directProductivity,
      competitiveGain,
      spilloverGain,
      privateTotal,
      socialTotal,
      uncapturedPublic,
      ratio
    };
  };

  const calculatePublicBCR = (params: PublicRDParams, privateBCR: number): PublicRDResults => {
    const directReturn = params.directReturn;
    const spilloverReturn = params.spilloverReturn;
    const interest = params.interestRate;
    const depreciation = params.depreciationRate;
    const leverageRatio = params.leverageRatio;

    // Public BCR
    const publicTotalReturn = directReturn + spilloverReturn;
    const multiplier = (1 + interest) / (interest + depreciation);
    const publicBCR = publicTotalReturn * multiplier;

    // Total BCR
    const leverageComponent = leverageRatio * privateBCR;
    const totalBCR = publicBCR + leverageComponent;

    return {
      totalBCR,
      publicBCR,
      privateBCR,
      leverageComponent
    };
  };

  // Update calculations when parameters change
  useEffect(() => {
    const newPrivateResults = calculatePrivateBCR(privateParams);
    setPrivateResults(newPrivateResults);
    
    const newPublicResults = calculatePublicBCR(publicParams, newPrivateResults.bcr);
    setPublicResults(newPublicResults);
  }, [privateParams, publicParams]);

  return (
    <Page title="UK R&D Policy Toolkit" subtitle="Calculate Return on Investment">
    <CalculatorContainer>
      <Container>
        <MainCard>
          <Tabs>
            <Tab 
              active={activeTab === 'private'} 
              onClick={() => setActiveTab('private')}
            >
              Private R&D Grants
            </Tab>
            <Tab 
              active={activeTab === 'public'} 
              onClick={() => setActiveTab('public')}
            >
              Public R&D Investment
            </Tab>
          </Tabs>

          <TabContent>
            {activeTab === 'private' ? (
              <PrivateRDForm
                params={privateParams}
                results={privateResults}
                onParamsChange={setPrivateParams}
              />
            ) : (
              <PublicRDForm
                params={publicParams}
                results={publicResults}
                onParamsChange={setPublicParams}
              />
            )}
          </TabContent>
        </MainCard>

        <InfoSection />
      </Container>
    </CalculatorContainer>
    </Page>
  );
}; 