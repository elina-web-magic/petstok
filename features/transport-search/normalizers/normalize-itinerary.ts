import { MS_IN_MINUTE } from '../constants'
import type { NormalizedItinerary, NormalizeItineraryInput } from '../types'

export const normalizeItinerary = ({
	itineraryId,
	segments,
}: NormalizeItineraryInput): NormalizedItinerary => {
	// Create a new array to avoid mutating original segments
	const sortedSegments = [...segments].sort((a, b) => {
		// Sort segments by departure time (earliest first)
		return new Date(a.departureAt.iso).getTime() - new Date(b.departureAt.iso).getTime()
	})

	// First segment defines the start of the journey
	const firstSegment = sortedSegments[0]

	// Last segment defines the end of the journey
	const lastSegment = sortedSegments[sortedSegments.length - 1]

	// Total duration is calculated as the difference between
	// the first departure and the last arrival
	// This includes waiting time between segments (transfers)
	const totalDurationMinutes =
		firstSegment && lastSegment
			? Math.max(
					0,
					Math.floor(
						(new Date(lastSegment.arrivalAt.iso).getTime() -
							new Date(firstSegment.departureAt.iso).getTime()) /
							MS_IN_MINUTE
					)
				)
			: 0

	// Return normalized itinerary structure
	return {
		itineraryId,
		segments: sortedSegments,
		totalDurationMinutes,
	}
}
