import { describe, it, expect } from 'vitest'
import { calculateTax } from './taxCalculator'

const brackets2022 = [
  { min: 0, max: 50197, rate: 0.15 },
  { min: 50197, max: 100392, rate: 0.205 },
  { min: 100392, max: 155625, rate: 0.26 },
  { min: 155625, max: 221708, rate: 0.29 },
  { min: 221708, rate: 0.33 },
]

const roundToCents = (value: number) => Math.round(value * 100) / 100

describe('calculateTax', () => {
  it('returns zero tax for zero salary', () => {
    const result = calculateTax(0, brackets2022)
    expect(result.totalTax).toBe(0)
    expect(result.effectiveRate).toBe(0)
    expect(result.bands).toHaveLength(0)
  })

  it('returns zero tax for negative salary', () => {
    const result = calculateTax(-1000, brackets2022)
    expect(result.totalTax).toBe(0)
  })

  it('returns $7,500.00 for $50,000 salary', () => {
    const result = calculateTax(50000, brackets2022)
    expect(roundToCents(result.totalTax)).toBe(7500.0)
  })

  it('returns $17,739.17 for $100,000 salary', () => {
    const result = calculateTax(100000, brackets2022)
    expect(roundToCents(result.totalTax)).toBe(17739.17)
  })

  it('returns $385,587.65 for $1,234,567 salary', () => {
    const result = calculateTax(1234567, brackets2022)
    expect(roundToCents(result.totalTax)).toBe(385587.65)
  })

  it('calculates effective rate correctly for $100,000', () => {
    const result = calculateTax(100000, brackets2022)
    expect(roundToCents(result.effectiveRate * 100)).toBe(17.74)
  })

  it('returns zero taxOwed for bands above salary', () => {
    const result = calculateTax(50000, brackets2022)
    const bandsAboveSalary = result.bands.filter((band) => band.min >= 50000)
    bandsAboveSalary.forEach((band) => {
      expect(band.taxOwed).toBe(0)
    })
  })
})
