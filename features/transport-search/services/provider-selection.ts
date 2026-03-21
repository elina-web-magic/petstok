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

	// TODO: use current search params as future business context for provider filtering

	// TODO: add route-based rules here when provider coverage differs by route
	// example: exclude ferry when route has no port connection

	// TODO: add passenger-based rules here when some providers support only limited group sizes
	// example: exclude train for large passenger count if provider contract requires split booking

	// TODO: add date-based rules here when some providers are unavailable on selected dates
	// example: exclude ferry for winter schedule or special blackout dates

	// TODO: add partner-specific restrictions here if config alone is not enough
	// example: a partner may enable bus and train globally, but allow ferry only for selected markets

	// TODO: keep this function business-oriented
	// do not add HTTP logic, adapter calls, query params, or UI behavior here

	// TODO: until real route rules exist, return providers unchanged
	void params

	return providers.filter((provider) => availableProviders.includes(provider))
}
