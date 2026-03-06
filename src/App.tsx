import './index.css'
import { useTaxCalculation } from './hooks/useTaxCalculation'
import TaxForm from './components/TaxForm/TaxForm'
import TaxResults from './components/TaxResults/TaxResults'

function App() {
  const { result, isLoading, error, calculate, reset } = useTaxCalculation()

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Tax Calculator per year</h1>

      <TaxForm onSubmit={calculate} onReset={reset} isLoading={isLoading} />

      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {result && <TaxResults result={result} />}
    </div>
  )
}

export default App
