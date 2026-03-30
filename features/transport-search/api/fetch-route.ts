import type {
	GoogleGeometryInput,
	MapboxGeometryInput,
	MapProviders,
	RouteRequestProps,
} from '../types'
import { fetchRouteGoogle } from './fetch-route-google'
import { fetchRouteMapbox } from './fetch-route-mapbox'

type FetchRouteResult = GoogleGeometryInput | MapboxGeometryInput

export const fetchRoute = async (
	props: RouteRequestProps,
	provider: MapProviders
): Promise<FetchRouteResult> => {
	if (provider === 'google') return fetchRouteGoogle(props)
	if (provider === 'mapbox') return fetchRouteMapbox(props)

	throw new Error('Unsupported map provider')
}
