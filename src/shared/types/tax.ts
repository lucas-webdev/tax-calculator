export interface TaxBracket {
  min: number
  max?: number // absent on the top bracket — rate applies to all income above min
  rate: number
}

export interface TaxBracketsResponse {
  tax_brackets: TaxBracket[]
}

export interface BandResult {
  min: number
  max?: number
  rate: number
  taxableAmount: number
  taxOwed: number
}

export interface TaxCalculationResult {
  salary: number
  totalTax: number
  effectiveRate: number
  bands: BandResult[]
}
