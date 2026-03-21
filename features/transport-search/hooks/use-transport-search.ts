import { useQuery } from '@tanstack/react-query'
import { searchTransportRoutes } from '../services/search-orchestrator'
import type { TransportSearchParams } from '../types'

export const useTransportSearch = (params: TransportSearchParams) => {
	return useQuery({
		queryKey: ['transport-search', params],
		queryFn: ({ signal }) => searchTransportRoutes(params, signal),
		enabled: Boolean(params.from && params.to && params.date && params.passengers),
	})
}
