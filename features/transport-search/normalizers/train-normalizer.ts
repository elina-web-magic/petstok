import { normalizeItinerary } from '../lib/normalize-itinerary'
import { normalizeTransportSegment } from '../lib/normalize-transport-segment'
import { resolveLocation } from '../lib/resolve-location'
import type {
	NormalizedItinerary,
	ProviderNormalizedSearchData,
	TrainRoutesApiResponse,
	TransportSearchResult,
} from '../types'

export const normalizeTrainRoutes = (
	response: TrainRoutesApiResponse
): ProviderNormalizedSearchData => {
	const itineraries: NormalizedItinerary[] = []
	const results: TransportSearchResult[] = response.routes.map((item) => {
		const origin = resolveLocation(item.originName)
		const destination = resolveLocation(item.destinationName)

		const segment = normalizeTransportSegment({
			provider: 'train',
			segmentId: item.journeyId,
			origin,
			destination,
			departureAtRaw: item.depTime,
			arrivalAtRaw: item.arrTime,
		})

		const itinerary = normalizeItinerary({
			itineraryId: item.journeyId,
			segments: [segment],
		})

		itineraries.push(itinerary)

		return {
			id: item.journeyId,
			provider: 'train',
			title: `${item.originName} → ${item.destinationName}`,
			from: item.originName,
			to: item.destinationName,
			departureTime: item.depTime,
			arrivalTime: item.arrTime,
			priceLabel: `€ ${item.price}`,
		}
	})

	return {
		results,
		itineraries,
	}
}
