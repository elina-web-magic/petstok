import { useQuery } from '@tanstack/react-query'
import type { RouteResponse } from '../types'

type UseRouteProps = {
	itineraryId: string | null
}

const getMockRoute = (itineraryId: string): RouteResponse => {
	if (itineraryId === 'bus-1') {
		return {
			itineraryId,
			segments: [],
			geometry: {
				points: [
					{ lat: 52.52, lng: 13.405 },
					{ lat: 52.51, lng: 13.39 },
					{ lat: 52.5, lng: 13.37 },
				],
			},
		}
	}

	if (itineraryId === 'ferry-1') {
		return {
			itineraryId,
			segments: [],
			geometry: {
				points: [
					{ lat: 53.5511, lng: 9.9937 },
					{ lat: 53.54, lng: 10.01 },
					{ lat: 53.53, lng: 10.03 },
				],
			},
		}
	}

	return {
		itineraryId,
		segments: [],
		geometry: {
			points: [
				{ lat: 48.8566, lng: 2.3522 },
				{ lat: 49.2, lng: 4.0 },
				{ lat: 50.1109, lng: 8.6821 },
			],
		},
	}
}

export const useRoute = ({ itineraryId }: UseRouteProps) => {
	return useQuery({
		queryKey: ['route', itineraryId],
		queryFn: async (): Promise<RouteResponse | null> => {
			if (!itineraryId) return null

			const res = await fetch(`/api/transport/route/${itineraryId}`)

			if (!res.ok) {
				return getMockRoute(itineraryId)
			}

			return res.json()
		},
		enabled: Boolean(itineraryId),
		staleTime: 1000 * 60 * 5,
	})
}
