import axios from 'axios'
import axiosRetry from 'axios-retry'
import type { TaxBracketsResponse } from '../shared/types/tax'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5001'

const apiClient = axios.create({ baseURL: BASE_URL })

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 500, // API intentionally throws random 500s
})

export const fetchTaxBrackets = async (year: number): Promise<TaxBracketsResponse> => {
  const response = await apiClient.get<TaxBracketsResponse>(`/tax-calculator/tax-year/${year}`)
  return response.data
}
