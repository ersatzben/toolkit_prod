export interface PrivateRDParams {
  techSpillover: number; // ψ₂
  productRivalry: number; // γ₁
  interestRate: number; // i
  depreciationRate: number; // δ
}

export interface PublicRDParams {
  directReturn: number; // ρdirect
  leverageRatio: number; // leverage multiplier
  spilloverReturn: number; // ρspillover
  interestRate: number; // i
  depreciationRate: number; // δ
}

export interface PrivateRDResults {
  bcr: number;
  directProductivity: number;
  competitiveGain: number;
  spilloverGain: number;
  privateTotal: number;
  socialTotal: number;
  uncapturedPublic: number;
  ratio: number;
}

export interface PublicRDResults {
  totalBCR: number;
  publicBCR: number;
  privateBCR: number;
  leverageComponent: number;
}

export type TabType = 'private' | 'public';

export type PresetType = 'conservative' | 'moderate' | 'optimistic' | 'lucking';
export type PublicPresetType = 'conservative' | 'frontier' | 'fieldhouse' | 'oecd';

export interface PresetData {
  [key: string]: Partial<PrivateRDParams> | Partial<PublicRDParams>;
} 