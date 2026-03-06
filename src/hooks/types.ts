import type { TaxCalculationResult } from '../shared/types/tax'

export interface UseTaxCalculationReturn {
  result: TaxCalculationResult | null
  isLoading: boolean
  error: string | null
  calculate: (salary: number, year: number) => Promise<void>
  reset: () => void
}
