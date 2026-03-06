import type { TaxResultsProps } from './types'
import { formatCurrency, formatPercent } from '../../shared/utils/formatters'

export default function TaxResults({ result }: TaxResultsProps) {
  const { totalTax, effectiveRate, bands } = result

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-gray-700">Tax by Band</h3>
      <div className="flex flex-col gap-1">
        {bands.map((band, index) => (
          <div
            key={index}
            className="flex justify-between rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-500"
          >
            <span>
              {/* Top bracket has no ceiling — display "$X+" instead of a range */}
              {formatCurrency(band.min)}
              {band.max ? ` – ${formatCurrency(band.max)}` : '+'}
            </span>
            <span>
              {formatCurrency(band.taxOwed)} ({formatPercent(band.rate)})
            </span>
          </div>
        ))}

        <div className="flex justify-between rounded-md px-3 py-2 text-sm font-semibold border-t border-gray-200 mt-1">
          <span className="text-gray-700">Total Tax</span>
          <span className="text-red-600">{formatCurrency(totalTax)}</span>
        </div>
      </div>

      <div className="flex justify-between px-3 text-sm">
        <span className="text-gray-500">Effective Rate</span>
        <span className="font-medium">{formatPercent(effectiveRate)}</span>
      </div>
    </div>
  )
}
