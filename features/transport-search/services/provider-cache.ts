import type { TransportProvider, TransportSearchResult } from '../types'

type ProviderCacheEntry = {
	results: TransportSearchResult[]
	updatedAt: number
}

const providerCache = new Map<TransportProvider, ProviderCacheEntry>()

export const getProviderCache = (provider: TransportProvider): ProviderCacheEntry | undefined => {
	return providerCache.get(provider)
}

export const setProviderCache = (
	provider: TransportProvider,
	results: TransportSearchResult[]
): void => {
	providerCache.set(provider, {
		results,
		updatedAt: Date.now(),
	})
}
