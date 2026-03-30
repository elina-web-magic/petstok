import { useQuery } from '@tanstack/react-query'
import { createTransportSearchController } from '../services/create-transport-search-controller'
import type { TransportSearchParams } from '../types'

export const useTransportSearch = (params: TransportSearchParams) => {
	const controller = createTransportSearchController()
	return useQuery({
		queryKey: ['transport-search', params],
		queryFn: () => controller.executeSearch(params),
		enabled: Boolean(params.from && params.to && params.date && params.passengers),
	})
}
