import type { TaxBracket, TaxCalculationResult, BandResult } from '../types/tax'

export function calculateTax(salary: number, brackets: TaxBracket[]): TaxCalculationResult {
  if (salary <= 0) {
    return { salary, totalTax: 0, effectiveRate: 0, bands: [] }
  }

  const bands: BandResult[] = brackets.map((bracket) => {
    const bandMax = bracket.max ?? Infinity

    if (salary <= bracket.min) {
      return { ...bracket, taxableAmount: 0, taxOwed: 0 }
    }

    const taxableAmount = Math.min(salary, bandMax) - bracket.min
    const taxOwed = taxableAmount * bracket.rate

    return { ...bracket, taxableAmount, taxOwed }
  })

  const totalTax = bands.reduce((sum, band) => sum + band.taxOwed, 0)
  const effectiveRate = totalTax / salary

  return { salary, totalTax, effectiveRate, bands }
}
