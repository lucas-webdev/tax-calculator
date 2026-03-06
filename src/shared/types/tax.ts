export interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

export interface TaxBracketsResponse {
  tax_brackets: TaxBracket[];
}

export interface BandResult {
  min: number;
  max?: number;
  rate: number;
  taxableAmount: number;
  taxOwed: number;
}

export interface TaxCalculationResult {
  salary: number;
  totalTax: number;
  effectiveRate: number;
  bands: BandResult[];
}