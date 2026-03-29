import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { getRouteForItinerary } from '../lib/get-route-for-itinerary'
import type { TransportProvider } from '../types'
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

	let foundItinerary: NormalizedItinerary | undefined

	for (const provider of providers) {
		const cachedEntry = getProviderCache(provider)

		if (cachedEntry) {
			const match = cachedEntry.itineraries.find((item) => item.itineraryId === itineraryId)

			if (match) {
				foundItinerary = match
				log.info('Itinerary found in cache', { provider })
				break
			}
		}
	}

	if (!foundItinerary) {
		log.error('Itinerary not found in any provider cache')
		throw new Error('Itinerary not found')
	}

	const geometry = await getRouteForItinerary({ itinerary: foundItinerary }, { provider: 'google' })

	return {
		itineraryId,
		segments: foundItinerary.segments,
		geometry,
	}
}
