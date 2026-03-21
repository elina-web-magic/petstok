import type { FerryRoutesApiResponse, TransportSearchResult } from '../types'

export const normalizeFerryRoutes = (response: FerryRoutesApiResponse): TransportSearchResult[] => {
	return response.results.map((result) => {
		return {
			id: result.sailingId,
			provider: 'ferry',
			title: `${result.origin} → ${result.destination}`,
			from: result.origin,
			to: result.destination,
			arrivalTime: result.start,
			departureTime: result.end,
			priceLabel: result.fareText, // TODO: parse price and currency from fareText if needed
		}
	})
}
