import type { TaxCalculationResult } from '../../shared/types/tax'

interface TaxResultsProps {
  result: TaxCalculationResult
}

const formatCurrency = (value: number): string =>
  value.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })

const formatPercent = (value: number): string => `${(value * 100).toFixed(2)}%`

export default function TaxResults({ result }: TaxResultsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard label="Annual Salary" value={formatCurrency(result.salary)} />
        <SummaryCard label="Total Tax" value={formatCurrency(result.totalTax)} />
        <SummaryCard label="Effective Rate" value={formatPercent(result.effectiveRate)} />
      </div>

      {result.bands.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Bracket</th>
                <th className="px-4 py-3 font-medium text-right">Rate</th>
                <th className="px-4 py-3 font-medium text-right">Taxable Amount</th>
                <th className="px-4 py-3 font-medium text-right">Tax Owed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {result.bands.map((band) => (
                <tr key={band.min} className="text-gray-700">
                  <td className="px-4 py-3">
                    {formatCurrency(band.min)} &ndash;{' '}
                    {band.max ? formatCurrency(band.max) : '\u221E'}
                  </td>
                  <td className="px-4 py-3 text-right">{formatPercent(band.rate)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(band.taxableAmount)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(band.taxOwed)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-gray-900">{value}</p>
    </div>
  )
}
