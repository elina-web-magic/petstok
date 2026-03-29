import type {
	BusRoutesApiResponse,
	ProviderNormalizedSearchData,
	TransportSearchResult,
} from '../types'

export const normalizeBusRoutes = (
	response: BusRoutesApiResponse
): ProviderNormalizedSearchData => {
	const results: TransportSearchResult[] = response.items.map((item) => {
		return {
			id: item.id,
			provider: 'bus',
			to: item.to_label,
			from: item.from_label,
			title: `${item.from_label} → ${item.to_label}`,
			priceLabel: `€ ${item.price_label}`,
			arrivalTime: item.arrival_time,
			departureTime: item.departure_time,
		}
	})

	return {
		results,
		itineraries: [],
	}
}
