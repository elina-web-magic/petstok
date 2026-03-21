import type { TrainRoutesApiResponse, TransportSearchResult } from '../types'

export const normalizeTrainRoutes = (response: TrainRoutesApiResponse): TransportSearchResult[] => {
	return response.routes.map((route) => {
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
}
