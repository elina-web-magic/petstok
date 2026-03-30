import { useQuery } from '@tanstack/react-query'
import { STALE_TIME } from '../constants'
import type { NormalizedItinerary } from '../types'

type UseRouteProps = {
	itinerary: NormalizedItinerary | null
}

export const useRoute = (props: UseRouteProps) => {
	const { itinerary } = props

	return useQuery({
		queryKey: ['route', itinerary?.itineraryId],
		queryFn: async () => {
			if (!itinerary) throw new Error('Missing itinerary data')

			const res = await fetch(`/api/transport/route`, {
				method: 'POST',
				body: JSON.stringify({ itinerary }),
			})

			if (!res.ok) throw new Error('Failed to load route')

			return res.json()
		},
		enabled: Boolean(itinerary),
		staleTime: STALE_TIME,
	})
}
