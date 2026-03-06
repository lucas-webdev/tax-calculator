import { useState, useCallback } from 'react'
import { fetchTaxBrackets } from '../services/taxApi'
import { calculateTax } from '../shared/utils/taxCalculator'
import type { TaxCalculationResult } from '../shared/types/tax'
import type { UseTaxCalculationReturn } from './types'

export function useTaxCalculation(): UseTaxCalculationReturn {
  const [result, setResult] = useState<TaxCalculationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  const calculate = useCallback(async (salary: number, year: number) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const { tax_brackets } = await fetchTaxBrackets(year)
      const calculation = calculateTax(salary, tax_brackets)
      setResult(calculation)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { result, isLoading, error, calculate, reset }
}
