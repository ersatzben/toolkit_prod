import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/foundations/theme';
import type { PublicRDParams, PublicRDResults, PublicPresetType } from '../../types/Calculator';

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
    border-color: ${newBrandColors.darkGreen};
    box-shadow: 0 0 0 3px ${newBrandColors.brightGreen}20;
  }
`;

const InputDescription = styled.div`
  font-size: 0.85rem;
  color: ${newBrandColors.charcoal};
  margin-top: 0.5rem;
  opacity: 0.7;
`;

const ResearchGuidance = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.brightGreen}30, ${newBrandColors.beige}50);
  border-left: 4px solid ${newBrandColors.darkGreen};
  padding: 1rem;
  margin-top: 0.75rem;
  border-radius: 0 8px 8px 0;
  font-size: 0.85rem;

  .label {
    font-weight: 600;
    color: ${newBrandColors.darkGreen};
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
  border: 1px solid ${newBrandColors.brightGreen}30;
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
  background: linear-gradient(135deg, ${newBrandColors.darkGreen}, ${newBrandColors.brightGreen});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const BCRExplanation = styled.div`
  color: ${newBrandColors.charcoal};
  margin-bottom: 2rem;
  font-size: 0.95rem;
  opacity: 0.8;
`;

const FormulaCard = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.brightGreen}20, ${newBrandColors.beige}40);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid ${newBrandColors.darkGreen};
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

const LeverageInfo = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.brightGreen}20, ${newBrandColors.beige}30);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid ${newBrandColors.brightGreen};
`;

const LeverageTitle = styled.h4`
  color: ${newBrandColors.darkGreen};
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const LeverageText = styled.p`
  color: ${newBrandColors.charcoal};
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.8;
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

interface PublicRDFormProps {
  params: PublicRDParams;
  results: PublicRDResults;
  onParamsChange: (params: PublicRDParams) => void;
}

export const PublicRDForm: React.FC<PublicRDFormProps> = ({ params, results, onParamsChange }) => {
  const handleInputChange = (field: keyof PublicRDParams, value: number) => {
    onParamsChange({
      ...params,
      [field]: value
    });
  };

  const setPreset = (preset: PublicPresetType) => {
    const presets = {
      'conservative': { directReturn: 0.03, leverageRatio: 0.3, spilloverReturn: 0.25, interestRate: 0.055, depreciationRate: 0.20 },
      'frontier': { directReturn: 0.05, leverageRatio: 0.5, spilloverReturn: 0.35, interestRate: 0.055, depreciationRate: 0.15 },
      'fieldhouse': { directReturn: 0.10, leverageRatio: 0.6, spilloverReturn: 0.80, interestRate: 0.055, depreciationRate: 0.15 },
      'oecd': { directReturn: 0.04, leverageRatio: 0.4, spilloverReturn: 0.30, interestRate: 0.055, depreciationRate: 0.15 }
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
    } else if (bcr < 4) {
      return 'BCR 2-4: Good returns, strong case for public investment';
    } else {
      return 'BCR > 4: Excellent returns, very strong case for public investment';
    }
  };

  return (
    <Grid>
      <div>
        <SectionTitle>Public R&D Parameters</SectionTitle>
        <SectionDescription>
          For public R&D investments with assumptions about leveraged private sector activity. Includes direct, leverage, and spillover effects.
        </SectionDescription>

        <Presets>
          <PresetsTitle>Scenario Presets:</PresetsTitle>
          <PresetButtons>
            <PresetButton onClick={() => setPreset('conservative')}>Conservative</PresetButton>
            <PresetButton onClick={() => setPreset('frontier')}>Frontier Economics</PresetButton>
            <PresetButton onClick={() => setPreset('fieldhouse')}>Fieldhouse-Mertens</PresetButton>
            <PresetButton onClick={() => setPreset('oecd')}>OECD Average</PresetButton>
          </PresetButtons>
        </Presets>

        <InputGroup>
          <InputLabel>Direct Return Rate (ρdirect)</InputLabel>
          <InputField
            type="number"
            value={params.directReturn}
            step="0.01"
            min="0"
            max="1"
            onChange={(e) => handleInputChange('directReturn', parseFloat(e.target.value) || 0)}
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
            value={params.leverageRatio}
            step="0.01"
            min="0"
            max="5"
            onChange={(e) => handleInputChange('leverageRatio', parseFloat(e.target.value) || 0)}
          />
          <InputDescription>How much additional private R&D is induced per £1 of public R&D.</InputDescription>
          <ResearchGuidance>
            <div className="label">Research guidance:</div>
            <div className="text">Empirical studies: 0.3–0.7 is typical. 0.5 means £1 public R&D induces £0.50 private R&D.</div>
          </ResearchGuidance>
        </InputGroup>

        <InputGroup>
          <InputLabel>Spillover Return Rate (ρspillover)</InputLabel>
          <InputField
            type="number"
            value={params.spilloverReturn}
            step="0.01"
            min="0"
            max="1"
            onChange={(e) => handleInputChange('spilloverReturn', parseFloat(e.target.value) || 0)}
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
          <BCRDisplay>BCR = {results.totalBCR.toFixed(2)}</BCRDisplay>
          <BCRExplanation>
            This is the total social benefit per £1 of public R&D, including both direct and leveraged private effects.
          </BCRExplanation>

          <FormulaCard>
            <FormulaTitle>Formula Used:</FormulaTitle>
            <Formula>Total BCR = Public BCR + (Leverage Ratio × Private BCR)</Formula>
            <div>BCR = {results.publicBCR.toFixed(2)} + ({params.leverageRatio} × {results.privateBCR.toFixed(2)}) = {results.totalBCR.toFixed(2)}</div>
          </FormulaCard>
        </ResultCard>

        <LeverageInfo>
          <LeverageTitle>Leverage Mechanism:</LeverageTitle>
          <LeverageText>
            The leverage component captures returns from private R&D crowded in by public investment. Based on empirical evidence, each £1 of public R&D typically crowds in £0.50-£0.60 of private R&D, which then generates its own returns (~14% annually).
          </LeverageText>
        </LeverageInfo>

        <InterpretationCard>
          <InterpretationTitle>Interpretation:</InterpretationTitle>
          <p>{getInterpretation(results.totalBCR)}</p>
        </InterpretationCard>
      </div>
    </Grid>
  );
}; 