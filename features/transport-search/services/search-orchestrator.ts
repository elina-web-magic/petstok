import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { searchBusRoutes } from '../adapters/bus-adapter'
import { searchFerryRoutes } from '../adapters/ferry-adapter'
import { searchTrainRoutes } from '../adapters/train-adapter'
import { PROVIDER_TIMEOUT_MS } from '../constants'
import { normalizeBusRoutes } from '../normalizers/bus-normalizer'
import { normalizeFerryRoutes } from '../normalizers/ferry-normalizer'
import { normalizeTrainRoutes } from '../normalizers/train-normalizer'
import type { ProviderSearchTask, TransportSearchParams, TransportSearchResult } from '../types'
import { getProviderCache, setProviderCache } from './provider-cache'
import { filterProvidersBySearchContext, getEnabledProvidersFromConfig } from './provider-selection'
import { withTimeout } from './with-timeout'

const logger = new Logger({
	scope: 'features:transport-search:services:search-orchestrator',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

export const searchTransportRoutes = async (
	params: TransportSearchParams,
	signal?: AbortSignal
): Promise<TransportSearchResult[]> => {
	const enabledProviders = getEnabledProvidersFromConfig()
	const selectedProviders = filterProvidersBySearchContext(enabledProviders, params)
	const requestId = crypto.randomUUID()
	const log = logger.child({ requestId })

	const tasks: ProviderSearchTask[] = selectedProviders.map((provider) => {
		log.info('Sent provider request', { provider })

		if (provider === 'bus')
			return {
				provider,
				request: withTimeout(
					searchBusRoutes(params, signal).then(normalizeBusRoutes),
					PROVIDER_TIMEOUT_MS,
					'Bus provider request timed out'
				),
			}

		if (provider === 'train')
			return {
				provider,
				request: withTimeout(
					searchTrainRoutes(params, signal).then(normalizeTrainRoutes),
					PROVIDER_TIMEOUT_MS,
					'Train provider request timed out'
				),
			}

		return {
			provider,
			request: withTimeout(
				searchFerryRoutes(params, signal).then(normalizeFerryRoutes),
				PROVIDER_TIMEOUT_MS,
				'Ferry provider request timed out'
			),
		}
	})
	// Merge Strategy:
	// - collect normalized results from all providers (bus, train, ferry)
	// - use Promise.allSettled to allow partial results if one provider fails
	// - fallback to cached provider results when available
	// - flatten all provider result arrays into a single list
	// - sort results by departureTime (ascending) to ensure consistent ordering for UI
	//
	// Trade-offs:
	// - current implementation uses simple time-based sorting
	// - does not yet support price ranking, provider priority, or tie-break rules
	// - assumes departureTime is ISO string and comparable via Date parsing
	const settledResults = await Promise.allSettled(tasks.map((task) => task.request))
	const fulfilledResults: TransportSearchResult[][] = []

	settledResults.forEach((result, index) => {
		const provider = tasks[index]?.provider

		if (!provider) {
			return
		}

		if (result.status === 'fulfilled') {
			setProviderCache(provider, result.value)
			log.info('Provider results cached', { provider })
			fulfilledResults.push(result.value)

			return
		}

		const cachedEntry = getProviderCache(provider)
		if (cachedEntry) {
			log.info('Cached provider results are used', { provider })
			fulfilledResults.push(cachedEntry.results)
		} else {
			log.error('Provider request failed without cache fallback', { provider }, result.reason)
		}
	})
	const mergedResults = fulfilledResults.flat()
	const sorted = mergedResults.sort(
		(a: TransportSearchResult, b: TransportSearchResult): number => {
			const aTime = new Date(a.departureTime).getTime()
			const bTime = new Date(b.departureTime).getTime()

			return aTime - bTime
		}
	)
	return sorted
}
