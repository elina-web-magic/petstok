import type {
	FerryRoutesApiResponse,
	ProviderNormalizedSearchData,
	TransportSearchResult,
} from '../types'

export const normalizeFerryRoutes = (
	response: FerryRoutesApiResponse
): ProviderNormalizedSearchData => {
	const results: TransportSearchResult[] = response.results.map((result) => {
		return {
			id: result.sailingId,
			provider: 'ferry',
			title: `${result.origin} → ${result.destination}`,
			from: result.origin,
			to: result.destination,
			arrivalTime: result.start,
			departureTime: result.end,
			priceLabel: result.fareText,
		}
	})

	return {
		results,
		itineraries: [],
	}
}
