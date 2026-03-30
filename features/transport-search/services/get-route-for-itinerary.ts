import { adaptGeometry } from '../adapters/geometry-adapter'
import { fetchRoute } from '../api/fetch-route'
import { buildRoutePayload } from '../builders/build-route-payload'
import type {
	GetRouteForItineraryDeps,
	GetRouteForItineraryInput,
	GoogleGeometryInput,
	MapboxGeometryInput,
	NormalizedGeometry,
} from '../types'
import { getCachedRoute, setCachedRoute } from './route-cache'

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

	const controller = new AbortController()

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
