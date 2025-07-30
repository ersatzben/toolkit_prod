import styled from 'styled-components';
import { newBrandColors } from '../foundations/theme';
import { media } from '../foundations/breakpoints';

// Base layout components
export const CalculatorContainer = styled.div`
  background: ${newBrandColors.beige};
  min-height: 100vh;
  width: 100%;
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  
  ${media.tablet} {
    padding: 1.5rem;
  }
  
  ${media.mobile} {
    padding: 1rem;
  }
`;

// Framework content moved to use common Section component

export const FrameworkList = styled.ul`
  list-style: none;
  padding-left: 0;
  
  li {
    padding: 0.5rem 0;
    color: ${newBrandColors.charcoal};
    line-height: 1.5;
    border-bottom: 1px solid ${newBrandColors.lightBlue}20;
    opacity: 0.8;
    
    &:last-child {
      border-bottom: none;
    }
    
    strong {
      color: ${newBrandColors.charcoal};
      opacity: 1;
    }
  }
`;

// Grid layouts for guidance
export const GuidelinesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
  
  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const GuidelineItem = styled.div`
  background: ${newBrandColors.beige}80;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid ${newBrandColors.darkBlue};
  
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${newBrandColors.charcoal};
  }
  
  p {
    color: ${newBrandColors.charcoal};
    line-height: 1.5;
    margin-bottom: 0;
    opacity: 0.8;
  }
  
  ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0.5rem;
  }
  
  li {
    padding: 0.25rem 0;
    color: ${newBrandColors.charcoal};
    line-height: 1.4;
    opacity: 0.8;
  }
`;

export const ApproachComparison = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1rem;
  
  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ApproachColumn = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: ${newBrandColors.charcoal};
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${newBrandColors.lightBlue}30;
  }
  
  ul {
    list-style: none;
    padding-left: 0;
  }
  
  li {
    padding: 0.4rem 0;
    color: ${newBrandColors.charcoal};
    line-height: 1.5;
    position: relative;
    padding-left: 1.2rem;
    opacity: 0.8;
    
    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: ${newBrandColors.darkBlue};
      font-weight: bold;
    }
  }
`;

// Main calculator card
export const MainCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  border: 1px solid ${newBrandColors.lightBlue}30;
`;

// Tabs
export const Tabs = styled.div`
  display: flex;
  background: rgba(0,0,0,0.05);
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  color: ${props => props.active ? newBrandColors.darkBlue : newBrandColors.charcoal};
  
  ${props => props.active && `
    background: white;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, ${newBrandColors.darkGreen}, ${newBrandColors.darkBlue});
    }
  `}
  
  &:not(.active):hover {
    background: rgba(255,255,255,0.5);
  }
  
  ${media.mobile} {
    padding: 1rem;
    font-size: 1rem;
  }
`;

export const TabContent = styled.div`
  padding: 2rem;
  
  ${media.tablet} {
    padding: 1.5rem;
  }
  
  ${media.mobile} {
    padding: 1rem;
  }
`;

// Content grid
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
  
  ${media.desktop} {
    gap: 2rem;
  }
  
  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

// Form components
export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${newBrandColors.charcoal};
`;

export const SectionDescription = styled.p`
  color: ${newBrandColors.charcoal};
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.8;
`;

export const Presets = styled.div`
  margin-bottom: 2rem;
`;

export const PresetsTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${newBrandColors.charcoal};
`;

export const PresetButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const PresetButton = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, ${newBrandColors.darkGreen}, ${newBrandColors.darkBlue});
  color: white;
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

export const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

export const InputLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${newBrandColors.charcoal};
`;

export const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${newBrandColors.lightBlue}30;
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

export const InputDescription = styled.div`
  font-size: 0.85rem;
  color: ${newBrandColors.charcoal};
  margin-top: 0.5rem;
  opacity: 0.7;
`;

export const ResearchGuidance = styled.div`
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

// Results components
export const ResultCard = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.beige}50, #ffffff);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  border: 1px solid ${newBrandColors.lightBlue}30;
`;

export const ResultTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${newBrandColors.charcoal};
`;

export const BCRDisplay = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${newBrandColors.darkGreen}, ${newBrandColors.darkBlue});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  
  ${media.mobile} {
    font-size: 2rem;
  }
`;

export const BCRExplanation = styled.div`
  color: ${newBrandColors.charcoal};
  margin-bottom: 2rem;
  font-size: 0.95rem;
  opacity: 0.8;
`;

export const Breakdown = styled.div`
  border-top: 1px solid ${newBrandColors.lightBlue}30;
  padding-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const BreakdownTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${newBrandColors.charcoal};
`;

export const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${newBrandColors.charcoal};
`;

export const InterpretationSection = styled.div<{ $color: string; $background: string }>`
  background: ${props => props.$background};
  border-left: 4px solid ${props => props.$color};
  padding: 1rem;
  margin-top: 1.5rem;
  border-radius: 0 8px 8px 0;
  
  strong {
    color: ${props => props.$color};
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  p {
    color: ${newBrandColors.charcoal};
    margin: 0;
    line-height: 1.5;
    font-weight: 500;
  }
`;

// Info cards
export const FormulaCard = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.lightBlue}20, ${newBrandColors.beige}40);
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-left: 4px solid ${newBrandColors.darkBlue};
`;

export const FormulaTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${newBrandColors.charcoal};
`;

export const Formula = styled.div`
  font-family: 'Courier New', monospace;
  background: rgba(255,255,255,0.7);
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: ${newBrandColors.charcoal};
`;

export const InterpretationCard = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.orange}20, ${newBrandColors.beige}40);
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1rem;
  border-left: 4px solid ${newBrandColors.orange};
`;

export const InterpretationTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${newBrandColors.charcoal};
`;

export const LeverageInfo = styled.div`
  background: linear-gradient(135deg, ${newBrandColors.brightGreen}20, ${newBrandColors.beige}30);
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1rem;
  border-left: 4px solid ${newBrandColors.brightGreen};
`;

export const LeverageTitle = styled.h4`
  color: ${newBrandColors.darkGreen};
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

export const LeverageText = styled.p`
  color: ${newBrandColors.charcoal};
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.8;
`;

// Collapsible section components
export const CollapsibleSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const CollapsibleHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${newBrandColors.lightBlue}20;
  border: 1px solid ${newBrandColors.lightBlue}30;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  
  &:hover {
    background: ${newBrandColors.lightBlue}30;
  }
`;

export const CollapsibleTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${newBrandColors.charcoal};
  margin: 0;
  text-align: left;
`;

export const CollapsibleIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${newBrandColors.darkBlue};
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;
`;

export const CollapsibleContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${props => props.$isOpen ? '1rem' : '0'};
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.$isOpen ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'};
`;

export const TopSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// Framework tabs for collapsible sections
export const FrameworkTabsContainer = styled.div`
  margin-top: 2rem;
`;

export const FrameworkTabs = styled.div`
  display: flex;
  border-bottom: 2px solid ${newBrandColors.lightBlue}30;
  margin-bottom: 1rem;
  
  ${media.mobile} {
    flex-wrap: wrap;
  }
`;

export const FrameworkTab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${props => props.active ? `${newBrandColors.lightBlue}20` : 'transparent'};
  color: ${props => props.active ? newBrandColors.darkBlue : newBrandColors.charcoal};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid ${props => props.active ? newBrandColors.darkBlue : 'transparent'};
  
  &:hover {
    background: ${`${newBrandColors.lightBlue}15`};
    color: ${newBrandColors.darkBlue};
  }
  
  ${media.mobile} {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    flex: 1;
    min-width: 0;
  }
`;

export const FrameworkTabContent = styled.div<{ $isActive: boolean }>`
  display: ${props => props.$isActive ? 'block' : 'none'};
`;

// Table components for responsive display
export const TableContainer = styled.div`
  overflow-x: auto;
  margin: 1rem 0;
  
  ${media.mobile} {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${newBrandColors.lightBlue}30;
    font-size: 0.9rem;
    
    ${media.mobile} {
      padding: 0.5rem;
      font-size: 0.8rem;
      white-space: nowrap;
    }
  }
  
  th {
    background: ${newBrandColors.lightBlue}20;
    font-weight: 600;
    color: ${newBrandColors.charcoal};
    position: sticky;
    top: 0;
  }
  
  tr:hover {
    background: ${newBrandColors.beige}30;
  }
`;

// Utility
export const Hidden = styled.div<{ $isHidden: boolean }>`
  display: ${props => props.$isHidden ? 'none' : 'block'};
`;