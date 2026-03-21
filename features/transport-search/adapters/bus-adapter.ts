import { apiClient } from '@/lib/api/client'
import { TRANSPORT_API_ENDPOINTS } from '../constants'
import type { BusSearchParams, TrainRoutesApiResponse } from '../types'

const buildBusSearchParams = (filters: BusSearchParams): URLSearchParams => {
	const params = new URLSearchParams()

	if (filters.destinationId) params.set('destinationId', filters.destinationId)
	if (filters.originId) params.set('originId', filters.originId)
	if (filters.pax) params.set('pax', filters.pax)
	if (filters.travelDate) params.set('travelDate', filters.travelDate)
	return params
}

export const searchTrainRoutes = async (
	params: BusSearchParams,
	signal?: AbortSignal
): Promise<TrainRoutesApiResponse> => {
	const urlParams = buildBusSearchParams(params)
	const url = `${TRANSPORT_API_ENDPOINTS.bus}?${urlParams.toString()}`

	return apiClient<TrainRoutesApiResponse>(url, { signal })
}
