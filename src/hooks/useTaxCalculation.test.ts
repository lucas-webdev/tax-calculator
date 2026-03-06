import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTaxCalculation } from './useTaxCalculation'

const mockBrackets = [
  { min: 0, max: 50197, rate: 0.15 },
  { min: 50197, max: 100392, rate: 0.205 },
  { min: 100392, max: 155625, rate: 0.26 },
  { min: 155625, max: 221708, rate: 0.29 },
  { min: 221708, rate: 0.33 },
]

vi.mock('../services/taxApi', () => ({
  fetchTaxBrackets: vi.fn(),
}))

import { fetchTaxBrackets } from '../services/taxApi'

const mockedFetch = vi.mocked(fetchTaxBrackets)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useTaxCalculation', () => {
  it('starts with idle state', () => {
    const { result } = renderHook(() => useTaxCalculation())

    expect(result.current.result).toBeNull()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('sets loading state while calculating', async () => {
    let resolve: (value: { tax_brackets: typeof mockBrackets }) => void
    mockedFetch.mockImplementation(
      () =>
        new Promise((r) => {
          resolve = r
        }),
    )

    const { result } = renderHook(() => useTaxCalculation())

    act(() => {
      result.current.calculate(100000, 2022)
    })

    expect(result.current.isLoading).toBe(true)

    await act(async () => {
      resolve!({ tax_brackets: mockBrackets })
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('returns calculation result on success', async () => {
    mockedFetch.mockResolvedValue({ tax_brackets: mockBrackets })

    const { result } = renderHook(() => useTaxCalculation())

    await act(async () => {
      await result.current.calculate(50000, 2022)
    })

    expect(result.current.result).not.toBeNull()
    expect(result.current.result!.salary).toBe(50000)
    expect(Math.round(result.current.result!.totalTax * 100) / 100).toBe(7500)
    expect(result.current.error).toBeNull()
  })

  it('sets error message on API failure', async () => {
    mockedFetch.mockRejectedValue(new Error('Network Error'))

    const { result } = renderHook(() => useTaxCalculation())

    await act(async () => {
      await result.current.calculate(50000, 2022)
    })

    expect(result.current.error).toBe('Network Error')
    expect(result.current.result).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  it('sets fallback error for non-Error throws', async () => {
    mockedFetch.mockRejectedValue('string error')

    const { result } = renderHook(() => useTaxCalculation())

    await act(async () => {
      await result.current.calculate(50000, 2022)
    })

    expect(result.current.error).toBe('An unexpected error occurred')
  })

  it('clears previous result and error on new calculation', async () => {
    mockedFetch.mockRejectedValueOnce(new Error('fail'))
    mockedFetch.mockResolvedValueOnce({ tax_brackets: mockBrackets })

    const { result } = renderHook(() => useTaxCalculation())

    await act(async () => {
      await result.current.calculate(50000, 2022)
    })
    expect(result.current.error).toBe('fail')

    await act(async () => {
      await result.current.calculate(50000, 2022)
    })
    expect(result.current.error).toBeNull()
    expect(result.current.result).not.toBeNull()
  })

  it('passes year to fetchTaxBrackets', async () => {
    mockedFetch.mockResolvedValue({ tax_brackets: mockBrackets })

    const { result } = renderHook(() => useTaxCalculation())

    await act(async () => {
      await result.current.calculate(50000, 2019)
    })

    expect(mockedFetch).toHaveBeenCalledWith(2019)
  })

  it('clears result and error when reset is called', async () => {
    mockedFetch.mockResolvedValue({ tax_brackets: mockBrackets })

    const { result } = renderHook(() => useTaxCalculation())

    await act(async () => {
      await result.current.calculate(50000, 2022)
    })
    expect(result.current.result).not.toBeNull()

    act(() => {
      result.current.reset()
    })

    expect(result.current.result).toBeNull()
    expect(result.current.error).toBeNull()
  })
})
