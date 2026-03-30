import { apiClient } from '@/lib/api/client'
import type { GoogleGeometryInput, RouteRequestProps } from '../types'

type LatLng = {
	latitude: number
	longitude: number
}

type Waypoint = {
	location: {
		latLng: LatLng
	}
}

type GoogleRoutesRequest = {
	origin: Waypoint
	destination: Waypoint
	intermediates?: Waypoint[]
	travelMode: 'DRIVE' | 'BICYCLE' | 'WALK' | 'TWO_WHEELER'
}

type GoogleRoutesResponse = {
	routes: {
		polyline: {
			encodedPolyline: string
		}
	}[]
}

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

	const requestBody: GoogleRoutesRequest = {
		origin: { location: { latLng: { latitude: origin.lat, longitude: origin.lng } } },
		destination: {
			location: { latLng: { latitude: destination.lat, longitude: destination.lng } },
		},
		travelMode: 'DRIVE',
	}

	if (intermediates.length > 0) {
		requestBody.intermediates = intermediates.map((p) => ({
			location: { latLng: { latitude: p.lat, longitude: p.lng } },
		}))
	}

	const data = await apiClient<GoogleRoutesResponse>(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Goog-Api-Key': apiKey,
			'X-Goog-FieldMask': 'routes.polyline.encodedPolyline',
		},
		body: JSON.stringify(requestBody),
		signal,
	})

	if (!data.routes || data.routes.length === 0) {
		return { encodedPolyline: '' }
	}

	return {
		encodedPolyline: data.routes[0].polyline.encodedPolyline,
	}
}
