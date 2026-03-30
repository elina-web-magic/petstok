import type { MergeProviderItinerariesInput, MergeProviderItinerariesResult } from '../types'

export const mergeProviderItineraries = ({
	providers,
	sortBy,
}: MergeProviderItinerariesInput): MergeProviderItinerariesResult => {
	const failedProviders = providers
		.filter((providerGroup) => providerGroup.status === 'failed')
		.map((providerGroup) => providerGroup.provider)

	const itinerariesRaw = providers
		.filter((providerGroup) => providerGroup.status === 'success')
		.flatMap((providerGroup) => providerGroup.itineraries)

	const timedOutProviders = providers
		.filter((provider) => provider.status === 'timeout')
		.map((provider) => provider.provider)

	const itineraries = [...itinerariesRaw]
	if (sortBy === 'fastest') {
		itineraries.sort((a, b) => a.totalDurationMinutes - b.totalDurationMinutes)
	} else if (sortBy === 'earliest-departure') {
		itineraries.sort((a, b) => {
			const timeA = a.segments[0]?.departureAt?.iso
				? new Date(a.segments[0].departureAt.iso).getTime()
				: Infinity
			const timeB = b.segments[0]?.departureAt?.iso
				? new Date(b.segments[0].departureAt.iso).getTime()
				: Infinity
			return timeA - timeB
		})
	}

	return {
		itineraries,
		partial: failedProviders.length > 0 || timedOutProviders.length > 0,
		failedProviders,
		timedOutProviders,
	}
}
