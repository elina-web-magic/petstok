import { apiClient } from '@/lib/api/client'
import { TRANSPORT_API_ENDPOINTS } from '../constants'
import type { FerrySearchParams, TrainRoutesApiResponse } from '../types'

const buildFerrySearchParams = (filters: FerrySearchParams): URLSearchParams => {
	const params = new URLSearchParams()

	if (filters.departureDate) params.set('departureDate', filters.departureDate)
	if (filters.passengerCount) params.set('passengerCount', filters.passengerCount)
	if (filters.portFrom) params.set('portFrom', filters.portFrom)
	if (filters.portTo) params.set('portTo', filters.portTo)
	return params
}

export const searchFerryRoutes = async (
	params: FerrySearchParams,
	signal?: AbortSignal
): Promise<TrainRoutesApiResponse> => {
	const urlParams = buildFerrySearchParams(params)
	const url = `${TRANSPORT_API_ENDPOINTS.ferry}?${urlParams.toString()}`

	return apiClient<TrainRoutesApiResponse>(url, { signal })
}
