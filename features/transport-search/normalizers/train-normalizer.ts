import type {
	ProviderNormalizedSearchData,
	TrainRoutesApiResponse,
	TransportSearchResult,
} from '../types'

export const normalizeTrainRoutes = (
	response: TrainRoutesApiResponse
): ProviderNormalizedSearchData => {
	const results: TransportSearchResult[] = response.routes.map((route) => {
		return {
			id: route.journeyId,
			provider: 'train',
			title: `${route.originName} → ${route.destinationName}`,
			from: route.originName,
			to: route.destinationName,
			departureTime: route.depTime,
			arrivalTime: route.arrTime,
			priceLabel: `€ ${route.price}`,
		}
	})

	return {
		results,
		itineraries: [],
	}
}
