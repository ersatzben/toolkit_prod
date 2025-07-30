import React, { useState } from 'react';
import { newBrandColors } from '../../styles/foundations/theme';
import { Page } from '../Page';
import { FormulaDisplay } from '../Reading/FormulaDisplay';
import {
  CalculatorContainer,
  Container,
  MainCard,
  Tabs,
  Tab,
  TabContent,
  Grid,
  SectionTitle,
  SectionDescription,
  Presets,
  PresetsTitle,
  PresetButtons,
  PresetButton,
  InputGroup,
  InputLabel,
  InputField,
  InputDescription,
  ResearchGuidance,
  ResultCard,
  ResultTitle,
  BCRDisplay,
  BCRExplanation,
  Breakdown,
  BreakdownTitle,
  BreakdownItem,
  LeverageInfo,
  LeverageTitle,
  LeverageText,
  Hidden,
  CollapsibleHeader,
  CollapsibleTitle,
  CollapsibleIcon,
  CollapsibleContent,
  TopSectionGrid,
  FrameworkTabsContainer,
  FrameworkTabs,
  FrameworkTab,
  FrameworkTabContent,
  InterpretationSection
} from '../../styles/components/Calculator';
import { Section, SubSectionTitle, Paragraph } from '../../styles/StyledComponents';

type TabType = 'private' | 'public';
type PresetType = 'conservative' | 'moderate' | 'optimistic' | 'lucking';
type PublicPresetType = 'conservative' | 'frontier' | 'fieldhouse' | 'oecd';

interface PrivateRDParams {
  techSpillover: number;
  productRivalry: number;
  interestRate: number;
  depreciationRate: number;
}

interface PublicRDParams {
  directReturn: number;
  leverageRatio: number;
  spilloverReturn: number;
  interestRate: number;
  depreciationRate: number;
}

export const CalculatorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('private');
  
  // Framework tabs state  
  const [activeFrameworkTab, setActiveFrameworkTab] = useState<string>('theoreticalFramework');
  const [isFrameworkExpanded, setIsFrameworkExpanded] = useState<boolean>(false);

  // Handler for framework section navigation from header menu
  const handleFrameworkSectionClick = (section: string) => {
    setActiveFrameworkTab(section);
    setIsFrameworkExpanded(true);
    // Scroll to framework section
    setTimeout(() => {
      const frameworkElement = document.querySelector('[data-framework-section]');
      if (frameworkElement) {
        frameworkElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  // Private R&D state
  const [privateParams, setPrivateParams] = useState<PrivateRDParams>({
    techSpillover: 0.231,
    productRivalry: -0.086,
    interestRate: 0.055,
    depreciationRate: 0.15
  });
  
  // Public R&D state  
  const [publicParams, setPublicParams] = useState<PublicRDParams>({
    directReturn: 0.05,
    leverageRatio: 0.5,
    spilloverReturn: 0.45,
    interestRate: 0.055,
    depreciationRate: 0.15
  });

  // Private calculation logic
  const calculatePrivateBCR = () => {
    const psi2 = privateParams.techSpillover;
    const gamma1 = privateParams.productRivalry;
    const yg = 2.345; // Median output-to-R&D ratio
    const psi1 = 0.015; // Own R&D elasticity
    const i = privateParams.interestRate;
    const delta = privateParams.depreciationRate;

    // Annual return components
    const directProductivity = yg * psi1;
    const spilloverGain = yg * psi2;
    const businessLoss = yg * 0.5 * Math.abs(gamma1); // Business stealing to the investing firm

    // Private return (what firm captures)
    const privateReturn = directProductivity + businessLoss;
    
    // Social return (total economic value)
    const socialReturn = directProductivity + spilloverGain;
    
    // Net spillover benefit (additional social value beyond private capture)
    const netSpillover = spilloverGain - businessLoss;

    // Social-to-private ratio
    const ratio = privateReturn !== 0 ? socialReturn / privateReturn : 0;

    // BCR (present value of social returns)
    const multiplier = (1 + i) / (i + delta);
    const bcr = socialReturn * multiplier;

    return {
      bcr,
      directProductivity,
      spilloverGain,
      businessLoss,
      privateReturn,
      socialReturn,
      netSpillover,
      ratio,
      multiplier
    };
  };

  // Public calculation logic
  const calculatePublicBCR = () => {
    const directReturn = publicParams.directReturn;
    const spilloverReturn = publicParams.spilloverReturn;
    const interest = publicParams.interestRate;
    const depreciation = publicParams.depreciationRate;
    const leverageRatio = publicParams.leverageRatio;

    // Public BCR
    const publicTotalReturn = directReturn + spilloverReturn;
    const multiplier = (1 + interest) / (interest + depreciation);
    const publicBCR = publicTotalReturn * multiplier;

    // Private BCR (live calculation from private tab parameters)
    const privateBCR = calculatePrivateBCR().bcr;

    // Leveraged component
    const leveragedBCR = leverageRatio * privateBCR;

    // Total BCR
    const totalBCR = publicBCR + leveragedBCR;

    return {
      totalBCR,
      publicBCR,
      privateBCR,
      leveragedBCR
    };
  };

  const privateResults = calculatePrivateBCR();
  const publicResults = calculatePublicBCR();

  const setPrivatePreset = (preset: PresetType) => {
    const presets = {
      'conservative': { techSpillover: 0.15, productRivalry: -0.05 },
      'moderate': { techSpillover: 0.20, productRivalry: -0.07 },
      'optimistic': { techSpillover: 0.28, productRivalry: -0.03 },
      'lucking': { techSpillover: 0.231, productRivalry: -0.086 }
    };
    setPrivateParams({
      ...privateParams,
      ...presets[preset]
    });
  };

  const setPublicPreset = (preset: PublicPresetType) => {
    const presets = {
      'conservative': { 
        directReturn: 0.03, 
        leverageRatio: 0.3, 
        spilloverReturn: 0.25, 
        interestRate: 0.055, 
        depreciationRate: 0.20 
      },
      'frontier': { 
        directReturn: 0.05, 
        leverageRatio: 0.5, 
        spilloverReturn: 0.35, 
        interestRate: 0.055, 
        depreciationRate: 0.15 
      },
      'fieldhouse': { 
        directReturn: 0.10, 
        leverageRatio: 0.6, 
        spilloverReturn: 0.80, 
        interestRate: 0.055, 
        depreciationRate: 0.15 
      },
      'oecd': { 
        directReturn: 0.04, 
        leverageRatio: 0.4, 
        spilloverReturn: 0.30, 
        interestRate: 0.055, 
        depreciationRate: 0.15 
      }
    };
    setPublicParams({
      ...publicParams,
      ...presets[preset]
    });
  };

  const getInterpretationData = (bcr: number, isPublic: boolean = false): { text: string; color: string; background: string } => {
    if (bcr < 1) {
      return {
        text: 'BCR < 1: Investment does not cover costs from social perspective',
        color: newBrandColors.deepRed,
        background: newBrandColors.lightRed + '20'
      };
    } else if (bcr < 2) {
      return {
        text: 'BCR 1-2: Modest positive returns, may be worthwhile depending on policy context',
        color: newBrandColors.orange,
        background: newBrandColors.orange + '20'
      };
    } else if (isPublic && bcr < 4) {
      return {
        text: 'BCR 2-4: Good returns, strong case for public investment',
        color: newBrandColors.darkBlue,
        background: newBrandColors.lightBlue + '20'
      };
    } else if (!isPublic && bcr < 3) {
      return {
        text: 'BCR 2-3: Good returns, strong case for investment',
        color: newBrandColors.darkBlue,
        background: newBrandColors.lightBlue + '20'
      };
    } else {
      return {
        text: `BCR > ${isPublic ? '4' : '3'}: Excellent returns, very strong case for ${isPublic ? 'public ' : ''}investment`,
        color: newBrandColors.darkGreen,
        background: newBrandColors.brightGreen + '20'
      };
    }
  };

  return (
    <Page 
      title="R&D Investment Calculator" 
      subtitle="Evaluate the economic returns of R&D spending using the perpetual inventory method"
      onFrameworkSectionClick={handleFrameworkSectionClick}
    >
      <CalculatorContainer>
        <Container>
          <Section style={{ background: 'white', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid #e8f4f8', marginBottom: '2rem', padding: '2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#2c3e50', textAlign: 'center' }}>Returns to R&D: Private and Public Perspectives</h2>
            
            {/* Top sections side by side */}
            <TopSectionGrid>
              <div style={{ marginBottom: '1.5rem' }}>
                <SubSectionTitle>Introduction</SubSectionTitle>
                <Paragraph>
                  Research and development investment represents one of the most critical yet analytically complex areas of economic policy. Understanding the returns to R&D requires navigating fundamental tensions between dynamic efficiency—ensuring adequate incentives for innovation—and static efficiency—maximising the diffusion of knowledge throughout the economy.
                </Paragraph>
                <Paragraph>
                  The economic significance of R&D extends far beyond direct productivity gains for investing organisations. Knowledge spillovers, complementarity effects between public and private investment, and the long-term nature of innovation benefits create substantial measurement challenges whilst highlighting the potential for systematic market failures in R&D provision.
                </Paragraph>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <SubSectionTitle>Policy Rationale</SubSectionTitle>
                <Paragraph>
                  The primary goal of public research is to ensure that a socially desirable amount of research into the right problems happens, by funding research efforts directly or compensating private agents as appropriate to incentivise them. A secondary goal that can often introduce tension with the first aim is trying to disseminate ideas as widely and as quickly as possible to maximise their societal impact.
                </Paragraph>
                <Paragraph>
                  A well-designed innovation policy should balance these trade-offs to ensure we deliver on well-being for all of society over the longer term. This creates a natural role for government intervention through many different tools and approaches, to ensure that innovators are appropriately rewarded for their efforts and that new ideas are encouraged.
                </Paragraph>
              </div>
            </TopSectionGrid>

            {/* Framework tabs - collapsed by default */}
            <FrameworkTabsContainer data-framework-section>
              <CollapsibleHeader onClick={() => setIsFrameworkExpanded(!isFrameworkExpanded)}>
                <CollapsibleTitle>Research Background</CollapsibleTitle>
                <CollapsibleIcon $isOpen={isFrameworkExpanded}>▼</CollapsibleIcon>
              </CollapsibleHeader>
              
              <CollapsibleContent $isOpen={isFrameworkExpanded}>
                <FrameworkTabs>
                  <FrameworkTab 
                    active={activeFrameworkTab === 'theoreticalFramework'}
                    onClick={() => setActiveFrameworkTab('theoreticalFramework')}
                  >
                    Theoretical Framework
                  </FrameworkTab>
                  <FrameworkTab 
                    active={activeFrameworkTab === 'empiricalEvidence'}
                    onClick={() => setActiveFrameworkTab('empiricalEvidence')}
                  >
                    Empirical Evidence
                  </FrameworkTab>
                  <FrameworkTab 
                    active={activeFrameworkTab === 'technicalMethodology'}
                    onClick={() => setActiveFrameworkTab('technicalMethodology')}
                  >
                    Technical Methodology
                  </FrameworkTab>
                </FrameworkTabs>

                <FrameworkTabContent $isActive={activeFrameworkTab === 'theoreticalFramework'}>
                  <SubSectionTitle>The Economics of Knowledge Production</SubSectionTitle>
                  <Paragraph>
                    Knowledge exhibits two fundamental characteristics that distinguish it from physical capital. First, ideas are <strong>nonrival</strong>—one person's use of knowledge does not diminish its availability to others. Second, knowledge is often <strong>nonexcludable</strong>—once created, controlling access to ideas proves difficult without specific institutional mechanisms such as patents or secrecy arrangements.
                  </Paragraph>
                  <Paragraph>
                    These characteristics create a systematic divergence between private and social returns to R&D investment. Creators capture only a fraction of the total value generated by their innovations, as knowledge spillovers benefit actors throughout the economy. This appropriability problem reduces private incentives for R&D investment below socially optimal levels.
                  </Paragraph>

                  <SubSectionTitle>Dynamic vs Static Efficiency Trade-offs</SubSectionTitle>
                  <Paragraph>
                    Innovation policy must balance competing objectives that operate across different time horizons and institutional contexts. Dynamic efficiency requires providing adequate incentives for knowledge creation, often through temporary exclusivity arrangements or direct public funding. Static efficiency demands rapid knowledge diffusion to maximise the immediate productive benefits of new ideas across the entire economy.
                  </Paragraph>
                </FrameworkTabContent>

                <FrameworkTabContent $isActive={activeFrameworkTab === 'empiricalEvidence'}>
                  <SubSectionTitle>Public R&D Returns</SubSectionTitle>
                  <Paragraph>
                    Contemporary research provides substantial evidence for positive returns to public R&D investment. Frontier Economics' analysis for the UK government reports average returns of approximately 40%, whilst Fieldhouse and Mertens' (2024) analysis of US appropriations data suggests considerably higher returns of 140-210% for non-defence R&D programmes.
                  </Paragraph>

                  <SubSectionTitle>Private-Public R&D Complementarity</SubSectionTitle>
                  <Paragraph>
                    Research by Moretti, Steinwender, and Van Reenen (2021) using OECD cross-country data indicates that government-financed R&D is associated with increased privately-funded research, with a 10% increase in public R&D corresponding to 5-6% increases in private investment. This finding challenges conventional crowding-out assumptions and suggests potential complementarity effects.
                  </Paragraph>

                  <SubSectionTitle>Knowledge Spillover Evidence</SubSectionTitle>
                  <Paragraph>
                    Myers and Lanahan (2021) examining US Department of Energy grants demonstrate significant multiplicative effects, with each patent produced by direct recipients associated with three additional patents from spillover beneficiaries. Dyèvre (2024) identifies that publicly-funded patents generate spillovers 2-3 times more impactful on firm productivity than those from private research.
                  </Paragraph>

                  <SubSectionTitle>Private R&D Spillovers</SubSectionTitle>
                  <Paragraph>
                    Lucking, Bloom, and Van Reenen (2019) provide comprehensive analysis finding that social returns to private R&D exceed private returns by approximately 4:1. Crucially, this research demonstrates that R&D spillovers have not declined in the 21st century, contrary to concerns about increased market concentration reducing knowledge diffusion.
                  </Paragraph>
                </FrameworkTabContent>

                <FrameworkTabContent $isActive={activeFrameworkTab === 'technicalMethodology'}>
                  <SubSectionTitle>Mathematical Framework</SubSectionTitle>
                  <Paragraph>
                    We employ the standard perpetual inventory methodology to estimate R&D capital stocks and their associated returns over time. This approach treats R&D as an investment that creates a stock of knowledge capital, which generates returns whilst depreciating at a constant rate.
                  </Paragraph>
                  
                  <SubSectionTitle>Benefit-Cost Ratio Framework</SubSectionTitle>
                  <Paragraph>
                    The benefit-cost ratio (BCR) translates the net present value calculation into a standardised metric:
                  </Paragraph>
                  
                  <FormulaDisplay 
                    latex="BCR = \rho_{total} \times \frac{1+i}{i+\delta}"
                    explanation="Where ρ_total is the total return rate, i is the discount rate, and δ is the depreciation rate."
                  />
                  
                  <Paragraph>
                    This formulation reveals how the BCR depends on three critical parameters: the total return rate (ρ_total), the discount rate (i), and the depreciation rate (δ). The term (1+i)/(i+δ) represents the "capitalisation factor"—converting an annual flow of returns into a present value multiple.
                  </Paragraph>

                  <SubSectionTitle>Private R&D Spillover Framework</SubSectionTitle>
                  <Paragraph>
                    Private R&D generates two distinct spillover effects: <strong>Technology spillovers (<FormulaDisplay latex="\psi_2" inline />)</strong> create positive externalities as knowledge enhances productivity of similar firms, whilst <strong>Product market rivalry (<FormulaDisplay latex="\gamma_1" inline />)</strong> creates negative impacts through business stealing effects.
                  </Paragraph>
                  <Paragraph>
                    Using Lucking et al. (2019) parameters: Marginal Private Return = 13.6%, Marginal Social Return = 57.7%, creating a Social-to-Private Ratio of 4.24:1. This substantial differential illustrates why market-driven R&D investment levels fall short of socially optimal allocations.
                  </Paragraph>
                </FrameworkTabContent>
              </CollapsibleContent>
            </FrameworkTabsContainer>
          </Section>

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
              <Hidden $isHidden={activeTab !== 'private'}>
                <Grid>
                  <div>
                    <SectionTitle>Private R&D Parameters</SectionTitle>
                    <SectionDescription>
                      For grants supporting private R&D or inducing private R&D activity. Uses the three-channel spillover framework from Lucking et al. (2019).
                    </SectionDescription>
                    
                    <Presets>
                      <PresetsTitle>Scenario Presets:</PresetsTitle>
                      <PresetButtons>
                        <PresetButton onClick={() => setPrivatePreset('conservative')}>Conservative</PresetButton>
                        <PresetButton onClick={() => setPrivatePreset('moderate')}>Moderate</PresetButton>
                        <PresetButton onClick={() => setPrivatePreset('optimistic')}>Optimistic</PresetButton>
                        <PresetButton onClick={() => setPrivatePreset('lucking')}>Lucking et al.</PresetButton>
                      </PresetButtons>
                    </Presets>

                    <InputGroup>
                      <InputLabel>Technology Spillover Elasticity (<FormulaDisplay latex="\psi_2" inline />)</InputLabel>
                      <InputField
                        type="number"
                        value={privateParams.techSpillover}
                        step="0.001"
                        min="-1"
                        max="1"
                        onChange={(e) => setPrivateParams({...privateParams, techSpillover: parseFloat(e.target.value) || 0})}
                      />
                      <InputDescription>Elasticity of a firm's output with respect to the R&D stock of technologically similar firms.</InputDescription>
                      <ResearchGuidance>
                        <div className="label">Research guidance:</div>
                        <div className="text">Lucking et al. (2019): 0.231 (preferred estimate). Represents the primary positive spillover effect.</div>
                      </ResearchGuidance>
                    </InputGroup>

                    <InputGroup>
                      <InputLabel>Product Market Rivalry Elasticity (<FormulaDisplay latex="\gamma_1" inline />)</InputLabel>
                      <InputField
                        type="number"
                        value={privateParams.productRivalry}
                        step="0.001"
                        min="-1"
                        max="1"
                        onChange={(e) => setPrivateParams({...privateParams, productRivalry: parseFloat(e.target.value) || 0})}
                      />
                      <InputDescription>Elasticity of a firm's output with respect to the R&D stock of product market rivals (business stealing effect).</InputDescription>
                      <ResearchGuidance>
                        <div className="label">Research guidance:</div>
                        <div className="text">Lucking et al. (2019): -0.086 (preferred estimate). Negative values reflect business stealing/competitive effects.</div>
                      </ResearchGuidance>
                    </InputGroup>

                    <InputGroup>
                      <InputLabel>Interest Rate (i)</InputLabel>
                      <InputField
                        type="number"
                        value={privateParams.interestRate}
                        step="0.001"
                        min="0"
                        max="0.2"
                        onChange={(e) => setPrivateParams({...privateParams, interestRate: parseFloat(e.target.value) || 0})}
                      />
                      <InputDescription>Social discount rate (typically 3.5% real + 2% inflation)</InputDescription>
                      <ResearchGuidance>
                        <div className="label">Research guidance:</div>
                        <div className="text">UK Treasury Green Book: 3.5% social discount rate. OECD average: 3-4%. Add inflation for nominal rate.</div>
                      </ResearchGuidance>
                    </InputGroup>

                    <InputGroup>
                      <InputLabel>Depreciation Rate (<FormulaDisplay latex="\delta" inline />)</InputLabel>
                      <InputField
                        type="number"
                        value={privateParams.depreciationRate}
                        step="0.01"
                        min="0"
                        max="0.5"
                        onChange={(e) => setPrivateParams({...privateParams, depreciationRate: parseFloat(e.target.value) || 0})}
                      />
                      <InputDescription>R&D capital depreciation rate</InputDescription>
                      <ResearchGuidance>
                        <div className="label">Research guidance:</div>
                        <div className="text">Basic research: 10-15% (longer-lasting). Applied research: 15-20%. Infrastructure R&D: 8-12%.</div>
                      </ResearchGuidance>
                    </InputGroup>
                  </div>

                  <div>
                    <ResultCard>
                      <ResultTitle>R&D Return Decomposition</ResultTitle>
                      <BCRDisplay>BCR = {privateResults.bcr.toFixed(2)}</BCRDisplay>

                      <Breakdown>
                        <BreakdownTitle>Component Returns (Annual):</BreakdownTitle>
                        <BreakdownItem><span>Direct productivity (<FormulaDisplay latex="\psi_1 \times Y/G" inline />):</span> <span>{(privateResults.directProductivity * 100).toFixed(1)}%</span></BreakdownItem>
                        <BreakdownItem><span>Technology spillovers (<FormulaDisplay latex="\psi_2 \times Y/G" inline />):</span> <span>{(privateResults.spilloverGain * 100).toFixed(1)}%</span></BreakdownItem>
                        <BreakdownItem><span>Business stealing (<FormulaDisplay latex="-0.5 \times |\gamma_1| \times Y/G" inline />):</span> <span>{(privateResults.businessLoss * 100).toFixed(1)}%</span></BreakdownItem>
                      </Breakdown>

                      <Breakdown>
                        <BreakdownTitle>Headline Returns (Annual):</BreakdownTitle>
                        <BreakdownItem><span>Private return (direct - business loss):</span> <span>{(privateResults.privateReturn * 100).toFixed(1)}%</span></BreakdownItem>
                        <BreakdownItem><span>Social return (direct + spillovers):</span> <span>{(privateResults.socialReturn * 100).toFixed(1)}%</span></BreakdownItem>
                        <BreakdownItem><span><strong>Net spillover benefit:</strong></span> <span>{(privateResults.netSpillover * 100).toFixed(1)}%</span></BreakdownItem>
                      </Breakdown>

                      <Breakdown>
                        <BreakdownTitle>Policy Relevance:</BreakdownTitle>
                        <BreakdownItem><span>Social-to-private return ratio:</span> <span>{privateResults.ratio.toFixed(2)}</span></BreakdownItem>
                        <div style={{fontSize:'0.95em', color: newBrandColors.charcoal, marginTop:'0.5em', opacity: 0.8}}>The <strong>net spillover benefit</strong> represents the additional social value beyond what firms capture privately, justifying public R&D support.</div>
                      </Breakdown>

                      <InterpretationSection 
                        $color={getInterpretationData(privateResults.bcr).color}
                        $background={getInterpretationData(privateResults.bcr).background}
                      >
                        <strong>Interpretation:</strong>
                        <p>{getInterpretationData(privateResults.bcr).text}</p>
                      </InterpretationSection>
                    </ResultCard>

                    <FormulaDisplay 
                      title="Framework:"
                      latex="BCR = MSR \times \frac{1+i}{i+\delta}"
                      explanation={`Where MSR = (Y/G) × (ψ₁ + ψ₂). For this calculation: MSR = ${(privateResults.socialReturn * 100).toFixed(1)}% × ${privateResults.multiplier.toFixed(2)} = ${privateResults.bcr.toFixed(2)}`}
                    />
                    
                    <FormulaDisplay 
                      latex="MSR = \frac{Y}{G} \times (\psi_1 + \psi_2)"
                      explanation="Marginal Social Return equals the output-to-R&D ratio times the sum of own R&D elasticity and spillover elasticity."
                    />

                  </div>
                </Grid>
              </Hidden>

              <Hidden $isHidden={activeTab !== 'public'}>
                <Grid>
                  <div>
                    <SectionTitle>Public R&D Parameters</SectionTitle>
                    <SectionDescription>
                      For public R&D investments with assumptions about leveraged private sector activity. Includes direct, leverage, and spillover effects.
                    </SectionDescription>

                    <Presets>
                      <PresetsTitle>Scenario Presets:</PresetsTitle>
                      <PresetButtons>
                        <PresetButton onClick={() => setPublicPreset('conservative')}>Conservative</PresetButton>
                        <PresetButton onClick={() => setPublicPreset('frontier')}>Frontier Economics</PresetButton>
                        <PresetButton onClick={() => setPublicPreset('fieldhouse')}>Fieldhouse-Mertens</PresetButton>
                        <PresetButton onClick={() => setPublicPreset('oecd')}>OECD Average</PresetButton>
                      </PresetButtons>
                    </Presets>

                    <InputGroup>
                      <InputLabel>Direct Return Rate (<FormulaDisplay latex="\rho_{direct}" inline />)</InputLabel>
                      <InputField
                        type="number"
                        value={publicParams.directReturn}
                        step="0.01"
                        min="0"
                        max="1"
                        onChange={(e) => setPublicParams({...publicParams, directReturn: parseFloat(e.target.value) || 0})}
                      />
                      <InputDescription>Direct productivity gains from public R&D</InputDescription>
                      <ResearchGuidance>
                        <div className="label">Research guidance:</div>
                        <div className="text">Typically 3-8%. Lower bound for basic research, higher for applied R&D with direct commercial applications.</div>
                      </ResearchGuidance>
                    </InputGroup>

                    <InputGroup>
                      <InputLabel>Leverage Ratio (additional private R&D per £1 public R&D)</InputLabel>
                      <InputField
                        type="number"
                        value={publicParams.leverageRatio}
                        step="0.01"
                        min="0"
                        max="5"
                        onChange={(e) => setPublicParams({...publicParams, leverageRatio: parseFloat(e.target.value) || 0})}
                      />
                      <InputDescription>How much additional private R&D is induced per £1 of public R&D.</InputDescription>
                      <ResearchGuidance>
                        <div className="label">Research guidance:</div>
                        <div className="text">Empirical studies: 0.3–0.7 is typical. 0.5 means £1 public R&D induces £0.50 private R&D.</div>
                      </ResearchGuidance>
                    </InputGroup>

                    <InputGroup>
                      <InputLabel>Spillover Return Rate (<FormulaDisplay latex="\rho_{spillover}" inline />)</InputLabel>
                      <InputField
                        type="number"
                        value={publicParams.spilloverReturn}
                        step="0.01"
                        min="0"
                        max="1"
                        onChange={(e) => setPublicParams({...publicParams, spilloverReturn: parseFloat(e.target.value) || 0})}
                      />
                      <InputDescription>Broader social spillovers and productivity gains</InputDescription>
                      <ResearchGuidance>
                        <div className="label">Research guidance:</div>
                        <div className="text">Frontier Economics: ~35-40%. Fieldhouse & Mertens: up to 80% for defence R&D. Dyèvre: 2-3× higher than private spillovers.</div>
                      </ResearchGuidance>
                    </InputGroup>

                    <InputGroup>
                      <InputLabel>Interest Rate (i)</InputLabel>
                      <InputField
                        type="number"
                        value={publicParams.interestRate}
                        step="0.001"
                        min="0"
                        max="0.2"
                        onChange={(e) => setPublicParams({...publicParams, interestRate: parseFloat(e.target.value) || 0})}
                      />
                      <InputDescription>Social discount rate (typically 3.5% real + 2% inflation)</InputDescription>
                      <ResearchGuidance>
                        <div className="label">Research guidance:</div>
                        <div className="text">UK Treasury Green Book: 3.5% social discount rate. OECD average: 3-4%. Add inflation for nominal rate.</div>
                      </ResearchGuidance>
                    </InputGroup>

                    <InputGroup>
                      <InputLabel>Depreciation Rate (<FormulaDisplay latex="\delta" inline />)</InputLabel>
                      <InputField
                        type="number"
                        value={publicParams.depreciationRate}
                        step="0.01"
                        min="0"
                        max="0.5"
                        onChange={(e) => setPublicParams({...publicParams, depreciationRate: parseFloat(e.target.value) || 0})}
                      />
                      <InputDescription>Public R&D capital depreciation rate</InputDescription>
                      <ResearchGuidance>
                        <div className="label">Research guidance:</div>
                        <div className="text">Basic research: 10-15% (longer-lasting). Applied research: 15-20%. Infrastructure R&D: 8-12%.</div>
                      </ResearchGuidance>
                    </InputGroup>
                  </div>

                  <div>
                    <ResultCard>
                      <ResultTitle>Public R&D BCR Result</ResultTitle>
                      <BCRDisplay>BCR = {publicResults.totalBCR.toFixed(2)}</BCRDisplay>
                      <BCRExplanation>This is the total social benefit per £1 of public R&D, including both direct and leveraged private effects.</BCRExplanation>
                      
                      <Breakdown>
                        <BreakdownTitle>Component Analysis:</BreakdownTitle>
                        <BreakdownItem><span>Direct public BCR:</span> <span>{publicResults.publicBCR.toFixed(2)}</span></BreakdownItem>
                        <BreakdownItem><span>Leveraged private BCR (<FormulaDisplay latex="\lambda \times" inline /> Private BCR):</span> <span>{publicResults.leveragedBCR.toFixed(2)}</span></BreakdownItem>
                      </Breakdown>

                      <FormulaDisplay 
                        title="Formula Used:"
                        latex="BCR_{total} = BCR_{public} + (\lambda \times BCR_{private})"
                        explanation={`Where λ is the leverage ratio. For this calculation: BCR = ${publicResults.publicBCR.toFixed(2)} + (${publicParams.leverageRatio} × ${publicResults.privateBCR.toFixed(2)}) = ${publicResults.totalBCR.toFixed(2)}`}
                      />

                      <InterpretationSection 
                        $color={getInterpretationData(publicResults.totalBCR, true).color}
                        $background={getInterpretationData(publicResults.totalBCR, true).background}
                      >
                        <strong>Interpretation:</strong>
                        <p>{getInterpretationData(publicResults.totalBCR, true).text}</p>
                      </InterpretationSection>
                    </ResultCard>

                    <LeverageInfo>
                      <LeverageTitle>Leverage Mechanism:</LeverageTitle>
                      <LeverageText>The leverage component captures returns from private R&D crowded in by public investment. Based on empirical evidence, each £1 of public R&D typically crowds in £0.50-£0.60 of private R&D, which then generates its own social returns.</LeverageText>
                    </LeverageInfo>

                  </div>
                </Grid>
              </Hidden>
            </TabContent>
          </MainCard>
        </Container>
      </CalculatorContainer>
    </Page>
  );
}; 