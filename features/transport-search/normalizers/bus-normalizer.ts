import { normalizeItinerary } from '../lib/normalize-itinerary'
import { normalizeTransportSegment } from '../lib/normalize-transport-segment'
import { resolveLocation } from '../lib/resolve-location'
import type {
	BusRoutesApiResponse,
	NormalizedItinerary,
	ProviderNormalizedSearchData,
	TransportSearchResult,
} from '../types'

export const normalizeBusRoutes = (
	response: BusRoutesApiResponse
): ProviderNormalizedSearchData => {
	const itineraries: NormalizedItinerary[] = []
	const results: TransportSearchResult[] = response.items.map((item) => {
		const routeName = `${item.from_label} → ${item.to_label}`
		const origin = resolveLocation(item.from_label)
		const destination = resolveLocation(item.to_label)

		const segment = normalizeTransportSegment({
			provider: 'bus',
			segmentId: item.id,
			origin,
			destination,
			departureAtRaw: item.departure_time,
			arrivalAtRaw: item.arrival_time,
		})

		const itinerary = normalizeItinerary({
			itineraryId: item.id,
			segments: [segment],
		})

		itineraries.push(itinerary)
		return {
			id: item.id,
			provider: 'bus',
			to: item.to_label,
			from: item.from_label,
			title: routeName,
			priceLabel: `€ ${item.price_label}`,
			arrivalTime: item.arrival_time,
			departureTime: item.departure_time,
			itinerary,
		}
	})

	return {
		results,
		itineraries,
	}
}
