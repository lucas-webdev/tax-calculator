import type { TaxResultsProps } from './types'
import type { BandResult } from '../../shared/types/tax'

const formatCurrency = (value: number) =>
  value.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })

const formatPercent = (value: number) => `${(value * 100).toFixed(2)}%`

const isActiveBand = (band: BandResult, salary: number) =>
  salary > band.min && salary <= (band.max ?? Infinity)

export default function TaxResults({ result }: TaxResultsProps) {
  const { totalTax, effectiveRate, bands, salary } = result

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Tax</span>
          <span className="font-medium text-red-600">{formatCurrency(totalTax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Effective Rate</span>
          <span className="font-medium">{formatPercent(effectiveRate)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-700">Tax by Band</h3>
        <div className="flex flex-col gap-1">
          {bands.map((band, index) => (
            <div
              key={index}
              className={`flex justify-between rounded-md px-3 py-2 text-sm ${
                isActiveBand(band, salary)
                  ? 'bg-blue-50 font-semibold text-blue-700'
                  : 'bg-gray-50 text-gray-500'
              }`}
            >
              <span>
                {formatCurrency(band.min)}
                {band.max ? ` – ${formatCurrency(band.max)}` : '+'} ({formatPercent(band.rate)})
              </span>
              <span>{formatCurrency(band.taxOwed)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
