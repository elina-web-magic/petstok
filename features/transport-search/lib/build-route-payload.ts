import type { NormalizedItinerary } from '../types/normalized-transport'

type RoutePoint = {
	lat: number
	lng: number
}

type BuildRoutePayloadResult = {
	points: RoutePoint[]
}

export const buildRoutePayload = ({
	itinerary,
}: {
	itinerary: NormalizedItinerary
}): BuildRoutePayloadResult => {
	const points: RoutePoint[] = []
	const addPoint = (loc: { lat: number | null; lng: number | null }) => {
		if (typeof loc.lat !== 'number' || typeof loc.lng !== 'number') return
		const lastPoint = points[points.length - 1]

		if (!lastPoint || lastPoint.lat !== loc.lat || lastPoint.lng !== loc.lng) {
			points.push({ lat: loc.lat, lng: loc.lng })
		}
	}

	for (const segment of itinerary.segments) {
		addPoint(segment.origin)
		addPoint(segment.destination)
	}
	return { points }
}
