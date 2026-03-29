import { ALL_TRANSPORT_PROVIDERS } from '../constants'
import { transportConfig } from '../transport-config'
import type { TransportProvider, TransportSearchParams } from '../types'

export const getEnabledProvidersFromConfig = (): TransportProvider[] => {
	const providers = new Set(transportConfig.providers)

	const fastResult = ALL_TRANSPORT_PROVIDERS.filter((item) => providers.has(item))

	if (fastResult.length === 0) return [...ALL_TRANSPORT_PROVIDERS]

	return [...fastResult]
}

export const filterProvidersBySearchContext = (
	providers: TransportProvider[],
	params: TransportSearchParams
): TransportProvider[] => {
	const availableProviders = getEnabledProvidersFromConfig()

	if (!providers || providers.length === 0) return availableProviders
	void params

	return providers.filter((provider) => availableProviders.includes(provider))
}
