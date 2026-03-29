import type { TransportProvider, TransportSearchResult } from '../types'
import type { NormalizedItinerary } from '../types/normalized-transport'

type ProviderCacheEntry = {
	results: TransportSearchResult[]
	itineraries: NormalizedItinerary[]
	updatedAt: number
}

const providerCache = new Map<TransportProvider, ProviderCacheEntry>()

export const getProviderCache = (provider: TransportProvider): ProviderCacheEntry | undefined => {
	return providerCache.get(provider)
}

export const setProviderCache = (
	provider: TransportProvider,
	results: TransportSearchResult[],
	itineraries: NormalizedItinerary[]
): void => {
	providerCache.set(provider, {
		results,
		itineraries,
		updatedAt: Date.now(),
	})
}
