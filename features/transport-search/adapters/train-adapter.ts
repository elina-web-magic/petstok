import { apiClient } from '@/lib/api/client'
import {
	buildTrainQueryParams,
	mapTransportSearchToTrainParams,
} from '../builders/train-request-builder'
import { TRANSPORT_API_ENDPOINTS } from '../constants'
import type { TrainRoutesApiResponse, TransportSearchParams } from '../types'

export const searchTrainRoutes = async (
	params: TransportSearchParams,
	signal?: AbortSignal
): Promise<TrainRoutesApiResponse> => {
	const providerParams = mapTransportSearchToTrainParams(params)
	const query = buildTrainQueryParams(providerParams)
	const url = `${TRANSPORT_API_ENDPOINTS.train}?${query.toString()}`

	return apiClient<TrainRoutesApiResponse>(url, { signal })
}
