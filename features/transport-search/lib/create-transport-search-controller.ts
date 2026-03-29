import { searchTransportRoutes } from '../services/search-orchestrator'
import type { TransportSearchParams, TransportSearchResponse } from '../types'
import { createSearchController } from './create-search-controller'

export const createTransportSearchController = () => {
	const controller = createSearchController<TransportSearchParams, TransportSearchResponse>()

	return {
		executeSearch: (params: TransportSearchParams): Promise<TransportSearchResponse | null> => {
			return controller.executeSearch(params, searchTransportRoutes)
		},
	}
}
