export interface Stock {
  id: string;
  particulars: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: number;
  nseCode: string;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  peRatio?: number;
  latestEarnings?: number;
  sector: string;
  stage2: boolean;
  salePrice?: number;
}

export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
  stocks: Stock[];
}

export interface PortfolioData {
  stocks: Stock[];
  sectorSummaries: SectorSummary[];
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}