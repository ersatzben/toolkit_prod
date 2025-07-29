import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/foundations/theme';
import { FormulaDisplay } from './FormulaDisplay';
import { DataTable } from './DataTable';
import { ResearchReference } from './ResearchReference';
import type { SensitivityTable, ResearchReference as ResearchReferenceType } from '../../types/Reading';

const Section = styled.section`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${newBrandColors.lightBlue}30;
`;

const SectionTitle = styled.h2`
  color: ${newBrandColors.charcoal};
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${newBrandColors.lightBlue}50;
  padding-bottom: 0.5rem;
`;

const SubsectionTitle = styled.h3`
  color: ${newBrandColors.charcoal};
  font-size: 1.3rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
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

const OrderedList = styled.ol`
  margin: 1rem 0;
  padding-left: 1.5rem;

  li {
    color: ${newBrandColors.charcoal};
    margin-bottom: 0.75rem;
    opacity: 0.8;
    line-height: 1.6;

    strong {
      color: ${newBrandColors.darkBlue};
      font-weight: 600;
    }
  }
`;

const Note = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.lightBlue}20, ${newBrandColors.beige}30);
  padding: 1.5rem;
  border-left: 4px solid ${newBrandColors.lightBlue};
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;

  p {
    margin: 0;
    color: ${newBrandColors.charcoal};
    opacity: 0.8;
    font-style: italic;
  }
`;

// Sample data for sensitivity tables
const sensitivityTable1: SensitivityTable = {
  title: "BCR with varying technology externality rates (Private Return = 0.10, Product Externality = 0.05)",
  description: "These tables assume an interest rate i = 5.5% (3.5% social discount rate + 2% inflation).",
  headers: ["Tech Ext = 0.10", "Tech Ext = 0.15", "Tech Ext = 0.20", "Tech Ext = 0.25", "Tech Ext = 0.30"],
  rowHeaders: ["0.05", "0.10", "0.15", "0.20", "0.25"],
  data: [
    [2.81, 3.37, 3.93, 4.49, 5.06],
    [2.33, 2.80, 3.27, 3.73, 4.20],
    [2.00, 2.40, 2.80, 3.20, 3.60],
    [1.75, 2.10, 2.45, 2.80, 3.15],
    [1.56, 1.87, 2.19, 2.50, 2.81]
  ]
};

const sensitivityTable2: SensitivityTable = {
  title: "BCR with varying product externality rates (Private Return = 0.10, Technology Externality = 0.15)",
  description: "",
  headers: ["Prod Ext = 0.00", "Prod Ext = 0.05", "Prod Ext = 0.10", "Prod Ext = 0.15", "Prod Ext = 0.20"],
  rowHeaders: ["0.05", "0.10", "0.15", "0.20", "0.25"],
  data: [
    [2.81, 3.37, 3.93, 4.49, 5.06],
    [2.33, 2.80, 3.27, 3.73, 4.20],
    [2.00, 2.40, 2.80, 3.20, 3.60],
    [1.75, 2.10, 2.45, 2.80, 3.15],
    [1.56, 1.87, 2.19, 2.50, 2.81]
  ]
};

// Sample research references
const luckingReference: ResearchReferenceType = {
  title: "Key Research Update: R&D Spillovers",
  authors: "Lucking, B., Bloom, N., & Van Reenen, J.",
  year: "2019",
  description: "Have R&D Spillovers Declined in the 21st Century? Fiscal Studies, vol. 40, no. 4, pp. 561–590. This study examines how R&D spillovers have evolved over time, finding that:",
  keyFindings: [
    "The magnitude of R&D spillovers remains as large in the second decade of the 21st century as it was in the mid 1980s",
    "The ratio of social return to private return to R&D is approximately four to one, supporting continued public investment in R&D",
    "Positive spillovers temporarily increased during the 1995-2004 digital technology boom",
    "The marginal social return to R&D is estimated at 58%, while the marginal private return is 14%"
  ]
};

const liHallReference: ResearchReferenceType = {
  title: "Key Research Update: R&D Depreciation",
  authors: "Li, W. C. Y., & Hall, B. H.",
  year: "2018",
  description: "Depreciation of Business R&D Capital. Review of Income and Wealth, Series 0, Number 0. This paper develops a forward-looking profit model to estimate R&D depreciation rates:",
  keyFindings: [
    "R&D depreciation rates are generally higher than the traditionally assumed 15% rate",
    "Rates vary significantly across industries",
    "Pharmaceutical industry has the lowest R&D depreciation rates, reflecting longer-term research and effective patent protection",
    "ICT sectors have higher R&D depreciation rates due to higher global outsourcing and shorter product life cycles",
    "Time-varying industry-specific rates inform about technological change dynamics and competition levels"
  ]
};

export const PrivateRDSection: React.FC = () => {
  return (
    <Section id="private">
      <SectionTitle>Private R&D Returns</SectionTitle>
      
      <Paragraph>
        Private sector R&D investment faces unique challenges in capturing the full value of innovation. 
        Firms must balance the costs of research against uncertain returns, while potentially valuable 
        knowledge often spills over to competitors and other industries.
      </Paragraph>

      <SubsectionTitle>Three Channels of Private R&D Returns</SubsectionTitle>
      <Paragraph>Private R&D generates returns through three distinct channels:</Paragraph>
      
      <OrderedList>
        <li><strong>Private returns to the investing firm (ρₚ)</strong>: Direct benefits captured by the company conducting the R&D</li>
        <li><strong>Product market externalities (ρₚᵣₒd)</strong>: Spillovers to firms in the same product space</li>
        <li><strong>Technology externalities (ρₜₑcₕ)</strong>: Spillovers to firms in the same technology space</li>
      </OrderedList>

      <SubsectionTitle>Detailed NPV Formula for Private R&D</SubsectionTitle>
      <Paragraph>
        The net present value (NPV) of R&D spending at time t can be represented as an infinite sum:
      </Paragraph>

      <FormulaDisplay 
        latex="NPV(R)_t = R_t \times (\rho_p + \rho_{prod} + \rho_{tech}) \times \sum_{n=0}^{\infty} \frac{(1-\delta)^n}{(1+i)^n}"
      />

      <Paragraph>To simplify, we define the total return rate as ρₜₒₜₐₗ = ρₚ + ρₚᵣₒd + ρₜₑcₕ</Paragraph>

      <FormulaDisplay 
        latex="NPV(R)_t = R_t \times \rho_{total} \times \frac{1+i}{i+\delta}"
      />

      <SubsectionTitle>NPV Decomposition by Return Type</SubsectionTitle>
      <Paragraph>We can decompose the NPV into its three components:</Paragraph>

      <FormulaDisplay 
        latex="NPV(R)_t = NPV_{private}(R)_t + NPV_{product}(R)_t + NPV_{technology}(R)_t"
      />

      <Paragraph>The Benefit-Cost Ratio for private R&D is:</Paragraph>
      <FormulaDisplay 
        latex="BCR = (\rho_p + \rho_{prod} + \rho_{tech}) \times \frac{1+i}{i+\delta}"
      />

      <ResearchReference reference={luckingReference} />
      <ResearchReference reference={liHallReference} />

      <SubsectionTitle>BCR Sensitivity Analysis</SubsectionTitle>
      <Paragraph>
        Below are tables showing how the BCR varies with different assumptions about return rates and depreciation.
      </Paragraph>

      <DataTable data={sensitivityTable1} />
      <DataTable data={sensitivityTable2} />

      <Note>
        <p><em>Note: All values assume a private return rate of 0.10 where applicable</em></p>
      </Note>
    </Section>
  );
}; 