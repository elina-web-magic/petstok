import type { NormalizedItinerary } from '../types/normalized-transport'
import { buildRoutePayload } from './build-route-payload'
import {
	adaptGeometry,
	type GoogleGeometryInput,
	type MapboxGeometryInput,
} from './geometry-adapter'
import { getCachedRoute, setCachedRoute } from './route-cache'

type RoutePoint = {
	lat: number
	lng: number
}

type NormalizedGeometry = {
	points: RoutePoint[]
}

type GetRouteForItineraryInput = {
	itinerary: NormalizedItinerary
}

type GetRouteForItineraryDeps = {
	fetchRoute: (points: RoutePoint[]) => Promise<unknown>
	provider: 'google' | 'mapbox'
}

export const getRouteForItinerary = async (
	{ itinerary }: GetRouteForItineraryInput,
	{ fetchRoute, provider }: GetRouteForItineraryDeps
): Promise<NormalizedGeometry> => {
	let geometry: NormalizedGeometry

	const itineraryId = itinerary.itineraryId

	const cached = getCachedRoute(itineraryId)
	if (cached) return cached

	const { points } = buildRoutePayload({ itinerary })

	if (points.length < 2) {
		return {
			points: [],
		}
	}

	const response = await fetchRoute(points)

	if (provider === 'google') {
		geometry = adaptGeometry({ provider, geometry: response as GoogleGeometryInput })
		setCachedRoute(itineraryId, geometry)

		return geometry
	} else {
		geometry = adaptGeometry({ provider, geometry: response as MapboxGeometryInput })
		setCachedRoute(itineraryId, geometry)

		return geometry
	}
}
