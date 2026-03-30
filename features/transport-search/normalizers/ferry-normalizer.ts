import { normalizeItinerary } from '../lib/normalize-itinerary'
import { normalizeTransportSegment } from '../lib/normalize-transport-segment'
import { resolveLocation } from '../lib/resolve-location'
import type {
	FerryRoutesApiResponse,
	NormalizedItinerary,
	ProviderNormalizedSearchData,
	TransportSearchResult,
} from '../types'

export const normalizeFerryRoutes = (
	response: FerryRoutesApiResponse
): ProviderNormalizedSearchData => {
	const itineraries: NormalizedItinerary[] = []
	const results: TransportSearchResult[] = response.results.map((item) => {
		const routeName = `${item.origin} → ${item.destination}`
		const origin = resolveLocation(item.origin)
		const destination = resolveLocation(item.destination)

		const segment = normalizeTransportSegment({
			provider: 'ferry',
			segmentId: item.sailingId,
			origin,
			destination,
			departureAtRaw: item.start,
			arrivalAtRaw: item.end,
		})

		const itinerary = normalizeItinerary({
			itineraryId: item.sailingId,
			segments: [segment],
		})

		itineraries.push(itinerary)

		return {
			id: item.sailingId,
			provider: 'ferry',
			title: routeName,
			from: item.origin,
			to: item.destination,
			departureTime: item.start,
			arrivalTime: item.end,
			priceLabel: item.fareText,
			itinerary,
		}
	})

	return {
		results,
		itineraries,
	}
}
