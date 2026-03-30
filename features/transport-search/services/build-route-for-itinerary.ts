import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import type {
	BuildRouteForItineraryInput,
	BuildRouteForItineraryResult,
	NormalizedItinerary,
	TransportProvider,
} from '../types'
import { getRouteForItinerary } from './get-route-for-itinerary'
import { getProviderCache } from './provider-cache'

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
