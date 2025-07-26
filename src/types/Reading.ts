export interface TableData {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
}

export interface FormulaSection {
  title: string;
  content: string;
  explanation?: string;
}

export interface ResearchReference {
  title: string;
  authors: string;
  year: string;
  description: string;
  keyFindings: string[];
}

export interface SensitivityTable {
  title: string;
  description: string;
  headers: string[];
  rowHeaders: string[];
  data: (number | string)[][];
  note?: string;
}

export interface SectionContent {
  id: string;
  title: string;
  content: string;
  subsections?: SectionContent[];
  formulas?: FormulaSection[];
  tables?: SensitivityTable[];
  references?: ResearchReference[];
} 