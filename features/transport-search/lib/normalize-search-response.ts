import type { NormalizedItinerary, NormalizeSearchResponseInput } from '../types'
import { normalizeItinerary } from './normalize-itinerary'
import { normalizeTransportSegment } from './normalize-transport-segment'

export const normalizeSearchResponse = ({
	provider,
	itineraries,
}: NormalizeSearchResponseInput): NormalizedItinerary[] => {
	return itineraries.map((itinerary) => {
		const normalizedSegments = itinerary.segments.map((segment) =>
			normalizeTransportSegment({
				provider,
				segmentId: segment.id,
				origin: segment.origin,
				destination: segment.destination,
				departureAtRaw: segment.departureAt,
				arrivalAtRaw: segment.arrivalAt,
				departureTimezone: segment.departureTimezone,
				arrivalTimezone: segment.arrivalTimezone,
			})
		)

		return normalizeItinerary({
			itineraryId: itinerary.id,
			segments: normalizedSegments,
		})
	})
}
