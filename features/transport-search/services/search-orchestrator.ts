import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { searchBusRoutes } from '../adapters/bus-adapter'
import { searchFerryRoutes } from '../adapters/ferry-adapter'
import { searchTrainRoutes } from '../adapters/train-adapter'
import { normalizeBusRoutes } from '../normalizers/bus-normalizer'
import { normalizeFerryRoutes } from '../normalizers/ferry-normalizer'
import { normalizeTrainRoutes } from '../normalizers/train-normalizer'
import type { ProviderSearchTask, TransportSearchParams, TransportSearchResult } from '../types'
import { filterProvidersBySearchContext, getEnabledProvidersFromConfig } from './provider-selection'

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
				request: searchBusRoutes(params, signal).then(normalizeBusRoutes),
			}

		if (provider === 'train')
			return {
				provider,
				request: searchTrainRoutes(params, signal).then(normalizeTrainRoutes),
			}

		return {
			provider,
			request: searchFerryRoutes(params, signal).then(normalizeFerryRoutes),
		}
	})

	const settledResults = await Promise.allSettled(tasks.map((task) => task.request))
	const fulfilledResults: TransportSearchResult[][] = []

	settledResults.forEach((result, index) => {
		const provider = tasks[index]?.provider

		if (result.status === 'fulfilled') {
			fulfilledResults.push(result.value)
			return
		}

		log.error('Provider request failed', { provider }, result.reason)
	})

	return fulfilledResults.flat()
}
