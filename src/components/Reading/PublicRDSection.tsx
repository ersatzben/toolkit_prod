import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/foundations/theme';
import { FormulaDisplay } from './FormulaDisplay';
import { DataTable } from './DataTable';
import type { SensitivityTable } from '../../types/Reading';

const Section = styled.section`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${newBrandColors.brightGreen}30;
`;

const SectionTitle = styled.h2`
  color: ${newBrandColors.darkGreen};
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${newBrandColors.brightGreen}50;
  padding-bottom: 0.5rem;
`;

const SubsectionTitle = styled.h3`
  color: ${newBrandColors.darkGreen};
  font-size: 1.3rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
`;

const SubsubsectionTitle = styled.h4`
  color: ${newBrandColors.charcoal};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem 0;
`;

const Paragraph = styled.p`
  color: ${newBrandColors.charcoal};
  line-height: 1.7;
  margin-bottom: 1.2rem;
  opacity: 0.9;

  &:last-child {
    margin-bottom: 0;
  }
`;

const UnorderedList = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;

  li {
    color: ${newBrandColors.charcoal};
    margin-bottom: 0.75rem;
    opacity: 0.8;
    line-height: 1.6;

    strong {
      color: ${newBrandColors.darkGreen};
      font-weight: 600;
    }
  }
`;

const ExecutiveSummary = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.brightGreen}20, ${newBrandColors.beige}30);
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
  border-left: 4px solid ${newBrandColors.darkGreen};
`;

const SummaryTitle = styled.h4`
  color: ${newBrandColors.darkGreen};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

// Sample public R&D sensitivity tables
const publicTable1: SensitivityTable = {
  title: "BCR with varying spillover rates (Direct Return = 0.05, Leverage Return = 0.08)",
  description: "All calculations assume i = 5.5% (3.5% real social discount rate + 2% inflation).",
  headers: ["Spillover = 0.25", "Spillover = 0.35", "Spillover = 0.45", "Spillover = 0.55", "Spillover = 0.65"],
  rowHeaders: ["0.10", "0.15", "0.20", "0.25", "0.30"],
  data: [
    [3.53, 4.47, 5.40, 6.33, 7.27],
    [3.01, 3.79, 4.60, 5.39, 6.19],
    [2.64, 3.32, 4.03, 4.72, 5.42],
    [2.36, 2.97, 3.60, 4.22, 4.84],
    [2.14, 2.69, 3.26, 3.82, 4.39]
  ]
};

const empiricalScenarios: SensitivityTable = {
  title: "BCR under different empirical scenarios",
  description: "",
  headers: ["Direct Return", "Leverage Return", "Spillover Return", "BCR (δ = 0.15)", "Source"],
  rowHeaders: ["Conservative", "Frontier Economics", "Fieldhouse-Mertens", "Lucking et al.", "OECD Average"],
  data: [
    [0.03, 0.05, 0.25, 2.65, "Lower bound estimates"],
    [0.05, 0.08, 0.35, 3.86, "UK DSIT (2024)"],
    [0.10, 0.10, 0.80, 8.04, "US appropriations data"],
    [0.05, 0.07, 0.45, 4.58, "Social vs private returns"],
    [0.04, 0.06, 0.30, 3.21, "Cross-country analysis"]
  ]
};

export const PublicRDSection: React.FC = () => {
  return (
    <Section id="public">
      <SectionTitle>Public R&D and Private-Public R&D Leveraging</SectionTitle>

      <SubsectionTitle>The Returns to Public R&D: A Policy Brief on the State of Current Research</SubsectionTitle>
      
      <ExecutiveSummary>
        <SummaryTitle>Executive Summary</SummaryTitle>
        <Paragraph>
          Governments across advanced economies allocate substantial public resources to Research and Development 
          with the explicit objective of catalysing innovation, enhancing productivity, and generating sustained 
          economic growth. The central policy question confronting decision-makers concerns whether these investments 
          yield commensurate returns.
        </Paragraph>
        <Paragraph>
          The evidence establishes a compelling case: public R&D investment constitutes a formidable engine of 
          economic expansion, generating social returns that substantially exceed the private returns captured by 
          innovating enterprises. Multiple rigorous studies demonstrate that public R&D funding exhibits 
          complementarity rather than substitution effects with private investment, effectively "crowding in" 
          additional private R&D.
        </Paragraph>
      </ExecutiveSummary>

      <SubsectionTitle>Core Findings: Elevated Returns and the Mechanism of Spillovers</SubsectionTitle>
      
      <SubsubsectionTitle>Quantifying Substantial Rates of Return</SubsubsectionTitle>
      <UnorderedList>
        <li>Frontier Economics' 2024 report for the UK government estimates average returns to public R&D reaching <strong>40%</strong>. This implies that a £100 million investment could be expected to increase annual private sector productivity by £40 million within six years, with benefits persisting over time.</li>
        <li>Analysing 70 years of US appropriations data, Fieldhouse and Mertens (2024) identify even higher returns of <strong>140% to 210%</strong> for non-defence R&D, concluding that such investment has been a primary driver of post-war productivity growth.</li>
        <li>Examining long-run fiscal policy effects, Antolin-Diaz and Surico (2022) find that whilst short-run government spending multipliers remain below unity, long-run multipliers significantly exceed unity, peaking at 2.</li>
      </UnorderedList>

      <SubsubsectionTitle>The "Crowding In" Effect: Catalysing Private Investment</SubsubsectionTitle>
      <UnorderedList>
        <li>Moretti, Steinwender, and Van Reenen (2021), utilising OECD country data, find that a 10% increase in government-financed R&D results in an additional 5-6% increase in privately-funded R&D.</li>
        <li>This catalytic effect likely occurs because public funding helps de-risk foundational research, validates new technological pathways, and covers high fixed costs that private firms might otherwise be unwilling to bear.</li>
      </UnorderedList>

      <SubsubsectionTitle>The Engine of Return: Scale and Scope of Knowledge Spillovers</SubsubsectionTitle>
      <UnorderedList>
        <li>Myers and Lanahan (2021) provide a striking finding: for every patent produced by a firm directly receiving a US Department of Energy grant, three additional patents are produced by other inventors and firms benefiting from spillovers of that initial research.</li>
        <li>Dyèvre (2024) finds that spillovers from public R&D are two to three times more impactful on firm productivity than spillovers from private R&D, as publicly-funded patents tend to be more science-reliant, more temporally advanced, and generate spillovers across broader technological ranges.</li>
      </UnorderedList>

      <SubsectionTitle>Public R&D: Detailed Benefit-Cost Analysis</SubsectionTitle>
      <Paragraph>
        Public R&D evaluation requires a more sophisticated approach than private R&D analysis due to the complex 
        mechanisms through which public investment generates returns. The framework must account for direct 
        productivity effects, private sector leveraging, and broader social spillovers.
      </Paragraph>

      <SubsubsectionTitle>Mathematical Framework for Public R&D Returns</SubsubsectionTitle>
      <Paragraph>
        The benefit-cost ratio for public R&D uses the same mathematical structure as the general framework, 
        but incorporates three distinct channels of return:
      </Paragraph>

      <FormulaDisplay 
        latex="BCR_{public} = (\rho_{direct} + \rho_{leverage} + \rho_{spillover}) \times \frac{1+i}{i+\delta}"
      />

      <Paragraph>Where the three return channels are:</Paragraph>
      <UnorderedList>
        <li><strong>ρ_direct</strong>: Direct returns to public R&D investment (productivity gains in public sector or direct beneficiaries)</li>
        <li><strong>ρ_leverage</strong>: Returns from leveraging private R&D investment (crowding-in effects)</li>
        <li><strong>ρ_spillover</strong>: Broader social spillovers and economy-wide productivity gains</li>
        <li><strong>i</strong>: Social discount rate (typically 3.5% real + inflation adjustment)</li>
        <li><strong>δ</strong>: Depreciation rate of public R&D capital</li>
      </UnorderedList>

      <SubsubsectionTitle>The Leveraging Mechanism: Crowding-In vs Crowding-Out</SubsubsectionTitle>
      <Paragraph>
        A critical component of public R&D returns operates through its effect on private R&D investment. 
        This leveraging effect can be quantified as:
      </Paragraph>

      <FormulaDisplay 
        latex="\rho_{leverage} = \gamma \times \rho_{private} \times \frac{Private\_R\&D_{induced}}{Public\_R\&D}"
      />

      <Paragraph>Where:</Paragraph>
      <UnorderedList>
        <li><strong>γ</strong>: Crowding-in multiplier (empirically estimated at 0.5-0.6 for each £1 of public R&D)</li>
        <li><strong>ρ_private</strong>: Average return rate on private R&D (approximately 14% based on Lucking et al.)</li>
        <li><strong>Ratio</strong>: Ratio of induced private investment to public investment</li>
      </UnorderedList>

      <DataTable data={publicTable1} />
      <DataTable data={empiricalScenarios} />

      <SubsectionTitle>Policy Implications and Implementation Considerations</SubsectionTitle>
      
      <SubsubsectionTitle>Optimising the Leverage Effect</SubsubsectionTitle>
      <Paragraph>To maximise the crowding-in of private R&D investment, public policy should:</Paragraph>
      <UnorderedList>
        <li><strong>Target foundational research</strong>: Focus on basic science where private investment is insufficient due to appropriability concerns</li>
        <li><strong>Ensure complementarity</strong>: Design programmes that complement rather than substitute for private R&D activities</li>
        <li><strong>Facilitate knowledge transfer</strong>: Invest in mechanisms that help private firms access and build upon public research</li>
        <li><strong>Support risk-taking</strong>: Fund high-risk, high-reward research that private markets underprovide</li>
      </UnorderedList>

      <SubsubsectionTitle>Maximising Spillover Benefits</SubsubsectionTitle>
      <Paragraph>The spillover component can be enhanced through:</Paragraph>
      <UnorderedList>
        <li><strong>Open science principles</strong>: Require publication and data sharing from publicly-funded research</li>
        <li><strong>University-industry collaboration</strong>: Fund programmes that explicitly connect academic research with commercial applications</li>
        <li><strong>Cross-sector mobility</strong>: Support researcher movement between public and private sectors</li>
        <li><strong>Infrastructure investment</strong>: Build shared research facilities that benefit multiple users</li>
      </UnorderedList>
    </Section>
  );
}; 