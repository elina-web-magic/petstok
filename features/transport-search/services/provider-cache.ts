import type {
	NormalizedItinerary,
	ProviderCacheEntry,
	TransportProvider,
	TransportSearchResult,
} from '../types'

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
