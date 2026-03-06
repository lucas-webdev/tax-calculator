import { useState } from 'react'
import type { TaxFormProps } from './types'

const SUPPORTED_YEARS = [2022, 2021, 2020, 2019] as const

export default function TaxForm({ onSubmit, isLoading }: TaxFormProps) {
  const [salary, setSalary] = useState('')
  const [salaryError, setSalaryError] = useState<string | null>(null)
  const [year, setYear] = useState<number>(SUPPORTED_YEARS[0])

  const validateSalary = (value: string): string | null => {
    if (!value) return null
    const parsed = parseFloat(value)
    if (isNaN(parsed)) return 'Please enter a valid salary'
    if (parsed < 0) return 'Salary must be a positive number'
    return null
  }

  const handleSalaryBlur = () => {
    setSalaryError(validateSalary(salary))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = parseFloat(salary)
    if (isNaN(parsed) || parsed < 0) return
    onSubmit(parsed, year)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="salary" className="text-sm font-medium text-gray-700">
          Annual Salary ($)
        </label>
        <input
          id="salary"
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 100000"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          onBlur={handleSalaryBlur}
          className={`rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            salaryError ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {salaryError && <span className="text-xs text-red-500">{salaryError}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="year" className="text-sm font-medium text-gray-700">
          Tax Year
        </label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {SUPPORTED_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!salary || isLoading}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Calculating...' : 'Calculate Tax'}
      </button>
    </form>
  )
}
