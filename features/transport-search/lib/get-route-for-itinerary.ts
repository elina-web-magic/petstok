import { fetchRoute } from '../api/fetch-route'
import type { MapProviders } from '../types'
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
	provider: MapProviders
}

let currentAbortController: AbortController | null = null

export const getRouteForItinerary = async (
	{ itinerary }: GetRouteForItineraryInput,
	{ provider }: GetRouteForItineraryDeps
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

	if (currentAbortController) {
		currentAbortController.abort()
	}

	const controller = new AbortController()
	currentAbortController = controller

	const request = await fetchRoute(
		{
			points,
			signal: controller.signal,
		},
		provider
	)

	if (provider === 'google') {
		const googleRequest = request as GoogleGeometryInput
		geometry = adaptGeometry({ provider, geometry: googleRequest })
	} else {
		geometry = adaptGeometry({ provider, geometry: request as MapboxGeometryInput })
	}

	if (controller.signal.aborted) {
		return {
			points: [],
		}
	}

	setCachedRoute(itineraryId, geometry)

	return geometry
}
