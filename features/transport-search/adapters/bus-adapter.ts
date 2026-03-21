import { apiClient } from '@/lib/api/client'
import { buildBusQueryParams, mapTransportSearchToBusParams } from '../builders/bus-request-builder'
import { TRANSPORT_API_ENDPOINTS } from '../constants'
import type { BusRoutesApiResponse, TransportSearchParams } from '../types'

export const searchBusRoutes = async (
	params: TransportSearchParams,
	signal?: AbortSignal
): Promise<BusRoutesApiResponse> => {
	const providerParams = mapTransportSearchToBusParams(params)
	const query = buildBusQueryParams(providerParams)

	const url = `${TRANSPORT_API_ENDPOINTS.bus}?${query.toString()}`

	return apiClient<BusRoutesApiResponse>(url, { signal })
}
