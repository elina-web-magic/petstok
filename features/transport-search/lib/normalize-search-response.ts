import type { NormalizedItinerary } from '../types/normalized-transport'
import { normalizeItinerary } from './normalize-itinerary'
import { normalizeTransportSegment } from './normalize-transport-segment'

type RawProviderLocation = {
	id?: string
	name?: string
	lat?: number
	lng?: number
}

type RawProviderSegment = {
	id: string
	origin: RawProviderLocation
	destination: RawProviderLocation
	departureAt: string
	arrivalAt: string
	departureTimezone?: string
	arrivalTimezone?: string
}

type RawProviderItinerary = {
	id: string
	segments: RawProviderSegment[]
}

type NormalizeSearchResponseInput = {
	provider: string
	itineraries: RawProviderItinerary[]
}

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
