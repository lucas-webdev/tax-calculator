export interface TaxFormProps {
  onSubmit: (salary: number, year: number) => void
  onReset: () => void
  isLoading: boolean
}
