import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import type { TransportProvider, TransportSearchResult } from '../types'
import type { NormalizedItinerary } from '../types/normalized-transport'
import { getProviderCache } from './provider-cache'

type BuildRouteForItineraryInput = {
	itineraryId: string
}

type BuildRouteForItineraryResult = {
	itineraryId: string
	segments: NormalizedItinerary['segments']
	geometry: {
		points: { lat: number; lng: number }[]
	}
}

const logger = new Logger({
	scope: 'features:transport-search:services:build-route-for-itinerary',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

export const buildRouteForItinerary = async (
	props: BuildRouteForItineraryInput
): Promise<BuildRouteForItineraryResult> => {
	const { itineraryId } = props
	const providers: TransportProvider[] = ['bus', 'train', 'ferry']
	const log = logger.child({ itineraryId })

	let foundResult: TransportSearchResult | undefined

	for (const provider of providers) {
		const cachedEntry = getProviderCache(provider)

		if (cachedEntry) {
			const match = (cachedEntry.results as TransportSearchResult[]).find(
				(item) => item.id === itineraryId
			)

			if (match) {
				foundResult = match
				log.info('Itinerary found in cache', { provider })
				break
			}
		}
	}

	if (!foundResult) {
		log.error('Itinerary not found in any provider cache')
		throw new Error('Itinerary not found')
	}

	return {
		itineraryId,
		segments: [],
		geometry: { points: [] },
	}
}
