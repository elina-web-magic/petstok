import { apiClient } from '@/lib/api/client'
import { TRANSPORT_API_ENDPOINTS } from '../constants'
import type { TrainRoutesApiResponse, TrainSearchParams } from '../types'

const buildTrainSearchParams = (filters: TrainSearchParams): URLSearchParams => {
	const params = new URLSearchParams()

	if (filters.date) params.set('date', filters.date)
	if (filters.from) params.set('from', filters.from)
	if (filters.to) params.set('to', filters.to)
	if (filters.passengers) params.set('passengers', filters.passengers.toString())
	return params
}

export const searchTrainRoutes = async (
	params: TrainSearchParams,
	signal?: AbortSignal
): Promise<TrainRoutesApiResponse> => {
	const urlParams = buildTrainSearchParams(params)
	const url = `${TRANSPORT_API_ENDPOINTS.train}?${urlParams.toString()}`

	return apiClient<TrainRoutesApiResponse>(url, { signal })
}
