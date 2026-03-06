import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaxResults from './TaxResults'
import type { TaxCalculationResult } from '../../shared/types/tax'

const mockResult: TaxCalculationResult = {
  salary: 100000,
  totalTax: 17739.17,
  effectiveRate: 0.1774,
  bands: [
    { min: 0, max: 50197, rate: 0.15, taxableAmount: 50197, taxOwed: 7529.55 },
    { min: 50197, max: 100392, rate: 0.205, taxableAmount: 49803, taxOwed: 10209.62 },
  ],
}

describe('TaxResults', () => {
  it('displays total tax and effective rate', () => {
    render(<TaxResults result={mockResult} />)

    expect(screen.getByText(/\$17,739\.17/)).toBeInTheDocument()
    expect(screen.getByText('17.74%')).toBeInTheDocument()
  })

  it('renders an entry for each tax band', () => {
    render(<TaxResults result={mockResult} />)

    expect(screen.getByText(/\$7,529\.55/)).toBeInTheDocument()
    expect(screen.getByText(/\$10,209\.62/)).toBeInTheDocument()
  })

  it('displays band range and rate', () => {
    render(<TaxResults result={mockResult} />)

    expect(screen.getByText(/15\.00%/)).toBeInTheDocument()
    expect(screen.getByText(/20\.50%/)).toBeInTheDocument()
  })

  it('shows plus sign for the top bracket instead of a range', () => {
    const topBandResult: TaxCalculationResult = {
      salary: 300000,
      totalTax: 73353.3,
      effectiveRate: 0.2445,
      bands: [{ min: 221708, rate: 0.33, taxableAmount: 78292, taxOwed: 25836.36 }],
    }

    render(<TaxResults result={topBandResult} />)

    expect(screen.getByText(/\$221,708\.00\+/)).toBeInTheDocument()
  })

  it('renders empty bands section when there are no bands', () => {
    const emptyResult: TaxCalculationResult = {
      salary: 0,
      totalTax: 0,
      effectiveRate: 0,
      bands: [],
    }

    render(<TaxResults result={emptyResult} />)

    expect(screen.getByText('Tax by Band')).toBeInTheDocument()
    expect(screen.getByText(/\$0\.00/)).toBeInTheDocument()
  })
})
