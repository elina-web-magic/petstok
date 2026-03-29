export type NormalizedDateTime = {
	iso: string
	timezone: string
	localDisplay: string
	dayOffset: number
}

export type NormalizedLocation = {
	id: string
	name: string
	lat: number | null
	lng: number | null
}

export type NormalizedTransportSegment = {
	provider: string
	segmentId: string
	origin: NormalizedLocation
	destination: NormalizedLocation
	departureAt: NormalizedDateTime
	arrivalAt: NormalizedDateTime
	durationMinutes: number
}

export type NormalizedItinerary = {
	itineraryId: string
	segments: NormalizedTransportSegment[]
	totalDurationMinutes: number
}

export type SearchRequestId = string
