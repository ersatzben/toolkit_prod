import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/theme';
import type { PrivateRDParams, PrivateRDResults, PresetType } from '../../types/Calculator';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${newBrandColors.charcoal};
`;

const SectionDescription = styled.p`
  color: ${newBrandColors.charcoal};
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.8;
`;

const Presets = styled.div`
  margin-bottom: 2rem;
`;

const PresetsTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${newBrandColors.charcoal};
`;

const PresetButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PresetButton = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, ${newBrandColors.darkGreen}, ${newBrandColors.darkBlue});
  color: ${newBrandColors.beige};
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`;

const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

const InputLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${newBrandColors.charcoal};
`;

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${newBrandColors.lightBlue}50;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: ${newBrandColors.charcoal};

  &:focus {
    outline: none;
    border-color: ${newBrandColors.darkBlue};
    box-shadow: 0 0 0 3px ${newBrandColors.lightBlue}20;
  }
`;

const InputDescription = styled.div`
  font-size: 0.85rem;
  color: ${newBrandColors.charcoal};
  margin-top: 0.5rem;
  opacity: 0.7;
`;

const ResearchGuidance = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.lightBlue}30, ${newBrandColors.beige}50);
  border-left: 4px solid ${newBrandColors.darkBlue};
  padding: 1rem;
  margin-top: 0.75rem;
  border-radius: 0 8px 8px 0;
  font-size: 0.85rem;

  .label {
    font-weight: 600;
    color: ${newBrandColors.darkBlue};
  }

  .text {
    color: ${newBrandColors.charcoal};
    margin-top: 0.25rem;
    opacity: 0.8;
  }
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.beige}50, #ffffff);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  border: 1px solid ${newBrandColors.lightBlue}30;
`;

const ResultTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${newBrandColors.charcoal};
`;

const BCRDisplay = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${newBrandColors.darkGreen}, ${newBrandColors.darkBlue});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const Breakdown = styled.div`
  border-top: 1px solid ${newBrandColors.lightBlue}50;
  padding-top: 1.5rem;
`;

const BreakdownTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${newBrandColors.charcoal};
`;

const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${newBrandColors.charcoal};
`;

const FormulaCard = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.lightBlue}20, ${newBrandColors.beige}40);
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-left: 4px solid ${newBrandColors.darkBlue};
`;

const FormulaTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${newBrandColors.charcoal};
`;

const Formula = styled.div`
  font-family: 'Courier New', monospace;
  background: rgba(255,255,255,0.7);
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: ${newBrandColors.charcoal};
`;

const InterpretationCard = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.orange}20, ${newBrandColors.beige}40);
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1rem;
  border-left: 4px solid ${newBrandColors.orange};
`;

const InterpretationTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${newBrandColors.charcoal};
`;

interface PrivateRDFormProps {
  params: PrivateRDParams;
  results: PrivateRDResults;
  onParamsChange: (params: PrivateRDParams) => void;
}

export const PrivateRDForm: React.FC<PrivateRDFormProps> = ({ params, results, onParamsChange }) => {
  const handleInputChange = (field: keyof PrivateRDParams, value: number) => {
    onParamsChange({
      ...params,
      [field]: value
    });
  };

  const setPreset = (preset: PresetType) => {
    const presets = {
      'conservative': { techSpillover: 0.15, productRivalry: -0.05 },
      'moderate': { techSpillover: 0.20, productRivalry: -0.07 },
      'optimistic': { techSpillover: 0.28, productRivalry: -0.03 },
      'lucking': { techSpillover: 0.231, productRivalry: -0.086 }
    };
    
    onParamsChange({
      ...params,
      ...presets[preset]
    });
  };

  const getInterpretation = (bcr: number): string => {
    if (bcr < 1) {
      return 'BCR < 1: Investment does not cover costs from social perspective';
    } else if (bcr < 2) {
      return 'BCR 1-2: Modest positive returns, may be worthwhile depending on policy context';
    } else if (bcr < 3) {
      return 'BCR 2-3: Good returns, strong case for investment';
    } else {
      return 'BCR > 3: Excellent returns, very strong case for investment';
    }
  };

  return (
    <Grid>
      <div>
        <SectionTitle>Private R&D Parameters</SectionTitle>
        <SectionDescription>
          For grants supporting private R&D or inducing private R&D activity. Uses the three-channel spillover framework.
        </SectionDescription>
        
        <Presets>
          <PresetsTitle>Scenario Presets:</PresetsTitle>
          <PresetButtons>
            <PresetButton onClick={() => setPreset('conservative')}>Conservative</PresetButton>
            <PresetButton onClick={() => setPreset('moderate')}>Moderate</PresetButton>
            <PresetButton onClick={() => setPreset('optimistic')}>Optimistic</PresetButton>
            <PresetButton onClick={() => setPreset('lucking')}>Lucking et al.</PresetButton>
          </PresetButtons>
        </Presets>

        <InputGroup>
          <InputLabel>Technology Spillover Elasticity (ψ₂)</InputLabel>
          <InputField
            type="number"
            value={params.techSpillover}
            step="0.001"
            min="-1"
            max="1"
            onChange={(e) => handleInputChange('techSpillover', parseFloat(e.target.value) || 0)}
          />
          <InputDescription>Elasticity of a firm's output with respect to the R&D stock of technologically similar firms.</InputDescription>
          <ResearchGuidance>
            <div className="label">Research guidance:</div>
            <div className="text">Lucking et al. (2019): 0.231 (preferred estimate). Represents the primary positive spillover effect.</div>
          </ResearchGuidance>
        </InputGroup>

        <InputGroup>
          <InputLabel>Product Market Rivalry Elasticity (γ₁)</InputLabel>
          <InputField
            type="number"
            value={params.productRivalry}
            step="0.001"
            min="-1"
            max="1"
            onChange={(e) => handleInputChange('productRivalry', parseFloat(e.target.value) || 0)}
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
            value={params.interestRate}
            step="0.001"
            min="0"
            max="0.2"
            onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
          />
          <InputDescription>Social discount rate (typically 3.5% real + 2% inflation)</InputDescription>
          <ResearchGuidance>
            <div className="label">Research guidance:</div>
            <div className="text">UK Treasury Green Book: 3.5% social discount rate. OECD average: 3-4%. Add inflation for nominal rate.</div>
          </ResearchGuidance>
        </InputGroup>

        <InputGroup>
          <InputLabel>Depreciation Rate (δ)</InputLabel>
          <InputField
            type="number"
            value={params.depreciationRate}
            step="0.01"
            min="0"
            max="0.5"
            onChange={(e) => handleInputChange('depreciationRate', parseFloat(e.target.value) || 0)}
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
          <BCRDisplay>BCR = {results.bcr.toFixed(2)}</BCRDisplay>
          
          <Breakdown>
            <BreakdownTitle>Component Breakdown:</BreakdownTitle>
            <BreakdownItem>
              <span>Direct productivity gain (additional new benefit to investing firm):</span>
              <span>{results.directProductivity.toFixed(3)}</span>
            </BreakdownItem>
            <BreakdownItem>
              <span>Business stealing (negative spillover for others):</span>
              <span>{results.competitiveGain.toFixed(3)}</span>
            </BreakdownItem>
            <BreakdownItem>
              <span>Technological diffusion (positive spillover for others):</span>
              <span>{results.spilloverGain.toFixed(3)}</span>
            </BreakdownItem>
            <BreakdownItem>
              <span>Net spillover to others:</span>
              <span>{results.uncapturedPublic.toFixed(3)}</span>
            </BreakdownItem>
          </Breakdown>

          <Breakdown>
            <BreakdownTitle>Headline Returns:</BreakdownTitle>
            <BreakdownItem>
              <span>Total social return (direct + net spillovers):</span>
              <span>{results.socialTotal.toFixed(3)}</span>
            </BreakdownItem>
            <BreakdownItem>
              <span>Private return (direct + business stealing):</span>
              <span>{results.privateTotal.toFixed(3)}</span>
            </BreakdownItem>
            <BreakdownItem>
              <span><strong>Uncaptured public value (spillovers minus business stealing):</strong></span>
              <span>{results.uncapturedPublic.toFixed(3)}</span>
            </BreakdownItem>
          </Breakdown>

          <Breakdown>
            <BreakdownTitle>Policy Relevance:</BreakdownTitle>
            <BreakdownItem>
              <span>Social-to-private return ratio:</span>
              <span>{results.ratio.toFixed(2)}</span>
            </BreakdownItem>
            <div style={{ fontSize: '0.95em', color: newBrandColors.charcoal, marginTop: '0.5em', opacity: 0.8 }}>
              The <strong>uncaptured public value</strong> (spillovers minus business stealing) is the key justification for public R&D support: it represents the net benefit to society that is not captured by the investing firm.
            </div>
          </Breakdown>
        </ResultCard>

        <FormulaCard>
          <FormulaTitle>Formula Used:</FormulaTitle>
          <Formula>BCR = (ρₚ + ρₚᵣₒd + ρₜₑcₕ) × (1+i)/(i+δ)</Formula>
          <div>BCR = ({(results.directProductivity * 100).toFixed(1)}% + {(results.competitiveGain * 100).toFixed(1)}% + {(results.spilloverGain * 100).toFixed(1)}%) × {((1 + params.interestRate) / (params.interestRate + params.depreciationRate)).toFixed(2)}</div>
        </FormulaCard>

        <InterpretationCard>
          <InterpretationTitle>Interpretation:</InterpretationTitle>
          <p>{getInterpretation(results.bcr)}</p>
        </InterpretationCard>
      </div>
    </Grid>
  );
}; 