import { apiClient } from '@/lib/api/client'
import type { MapboxGeometryInput } from '../lib/geometry-adapter'
import type { RouteRequestProps } from '../types'

export const fetchRouteMapbox = async (props: RouteRequestProps): Promise<MapboxGeometryInput> => {
	const { points, signal } = props

	const apiKey = process.env.MAPBOX_KEY
	if (!apiKey) throw new Error('Mapbox key is not defined')

	const coordinates = points.map((p) => `${p.lng},${p.lat}`).join(';')

	const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${apiKey}`

	const data = await apiClient<{
		routes: {
			geometry: {
				coordinates: [number, number][]
			}
		}[]
	}>(url, {
		method: 'GET',
		signal,
	})

	return {
		coordinates: data.routes[0].geometry.coordinates,
	}
}
