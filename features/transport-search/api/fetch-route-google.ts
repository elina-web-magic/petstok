import { apiClient } from '@/lib/api/client'
import type { GoogleGeometryInput } from '../lib/geometry-adapter'
import type { RouteRequestProps } from '../types'

export const fetchRouteGoogle = async (props: RouteRequestProps): Promise<GoogleGeometryInput> => {
	const { points, signal } = props

	if (points.length < 2) return { encodedPolyline: '' }

	const url = process.env.GOOGLE_MAP_URL
	const apiKey = process.env.GOOGLE_MAP_KEY

	const origin = points[0]
	const destination = points[points.length - 1]
	const intermediates = points.slice(1, -1)

	if (!url) {
		throw new Error('URL to map provider is not defined')
	}

	if (!apiKey) {
		throw new Error('Map Provider key is not defined')
	}

	const response = await apiClient(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Goog-Api-Key': apiKey,
			'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
		},
		body: JSON.stringify({
			origin: { location: { latLng: { latitude: origin.lat, longitude: origin.lng } } },
			destination: {
				location: { latLng: { latitude: destination.lat, longitude: destination.lng } },
			},
			intermediates: intermediates.map((p) => ({
				location: { latLng: { latitude: p.lat, longitude: p.lng } },
			})),
			travelMode: 'DRIVE',
		}),
		signal,
	})

	const data = response as {
		routes: {
			polyline: {
				encodedPolyline: string
			}
		}[]
	}

	return {
		encodedPolyline: data.routes[0].polyline.encodedPolyline,
	}
}
