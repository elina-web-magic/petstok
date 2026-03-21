import { apiClient } from '@/lib/api/client'
import {
	buildFerryQueryParams,
	mapTransportSearchToFerryParams,
} from '../builders/ferry-request-builder'
import { TRANSPORT_API_ENDPOINTS } from '../constants'
import type { FerryRoutesApiResponse, TransportSearchParams } from '../types'

export const searchFerryRoutes = async (
	params: TransportSearchParams,
	signal?: AbortSignal
): Promise<FerryRoutesApiResponse> => {
	const providerParams = mapTransportSearchToFerryParams(params)
	const query = buildFerryQueryParams(providerParams)
	const url = `${TRANSPORT_API_ENDPOINTS.ferry}?${query.toString()}`

	return apiClient<FerryRoutesApiResponse>(url, { signal })
}
