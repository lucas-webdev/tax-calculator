import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaxForm from './TaxForm'

describe('TaxForm', () => {
  const onSubmit = vi.fn()
  const onReset = vi.fn()

  beforeEach(() => {
    onSubmit.mockClear()
    onReset.mockClear()
  })

  it('renders salary input and year select', () => {
    render(<TaxForm onSubmit={onSubmit} onReset={onReset} isLoading={false} />)

    expect(screen.getByLabelText(/annual salary/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tax year/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /calculate tax/i })).toBeInTheDocument()
  })

  it('calls onSubmit with salary and year', async () => {
    const user = userEvent.setup()
    render(<TaxForm onSubmit={onSubmit} onReset={onReset} isLoading={false} />)

    await user.type(screen.getByLabelText(/annual salary/i), '100000')
    await user.click(screen.getByRole('button', { name: /calculate tax/i }))

    expect(onSubmit).toHaveBeenCalledWith(100000, 2022)
  })

  it('allows selecting a different tax year', async () => {
    const user = userEvent.setup()
    render(<TaxForm onSubmit={onSubmit} onReset={onReset} isLoading={false} />)

    await user.selectOptions(screen.getByLabelText(/tax year/i), '2019')
    await user.type(screen.getByLabelText(/annual salary/i), '50000')
    await user.click(screen.getByRole('button', { name: /calculate tax/i }))

    expect(onSubmit).toHaveBeenCalledWith(50000, 2019)
  })

  it('disables submit button when loading', () => {
    render(<TaxForm onSubmit={onSubmit} onReset={onReset} isLoading={true} />)

    expect(screen.getByRole('button', { name: /calculating/i })).toBeDisabled()
  })

  it('disables submit button when salary is empty', () => {
    render(<TaxForm onSubmit={onSubmit} onReset={onReset} isLoading={false} />)

    expect(screen.getByRole('button', { name: /calculate tax/i })).toBeDisabled()
  })

  it('calls onReset and shows error for negative salary', () => {
    render(<TaxForm onSubmit={onSubmit} onReset={onReset} isLoading={false} />)

    const input = screen.getByLabelText(/annual salary/i)
    // fireEvent bypasses browser-level number input restrictions that block negative values
    fireEvent.change(input, { target: { value: '-100' } })
    fireEvent.submit(screen.getByRole('button', { name: /calculate tax/i }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(onReset).toHaveBeenCalled()
    expect(screen.getByText(/salary must be a positive number/i)).toBeInTheDocument()
  })
})
