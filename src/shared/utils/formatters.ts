export const formatCurrency = (value: number) =>
  value.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })

export const formatPercent = (value: number) => `${(value * 100).toFixed(2)}%`
