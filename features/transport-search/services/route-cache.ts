import type { NormalizedGeometry } from '../types'

const routeCache = new Map<string, NormalizedGeometry>()

export const getCachedRoute = (itineraryId: string): NormalizedGeometry | null => {
	return routeCache.get(itineraryId) || null
}

export const setCachedRoute = (itineraryId: string, geometry: NormalizedGeometry): void => {
	routeCache.set(itineraryId, geometry)
}
