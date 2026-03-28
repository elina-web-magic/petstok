import { type NextRequest, NextResponse } from 'next/server'
import { getRouteForItinerary } from '@/features/transport-search/lib/get-route-for-itinerary'
import { mergeProviderItineraries } from '@/features/transport-search/lib/merge-provider-itineraries'
import { normalizeSearchResponse } from '@/features/transport-search/lib/normalize-search-response'

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	const normalized = normalizeSearchResponse(body.rawData)

	const merged = mergeProviderItineraries({
		providers: [
			{
				provider: body.provider,
				status: 'success',
				itineraries: normalized,
			},
		],
		sortBy: body.sortBy ?? 'fastest',
	})

	const itinerary = merged.itineraries[0]

	if (!itinerary) {
		return NextResponse.json({ itineraries: [], route: null })
	}

	const route = await getRouteForItinerary(
		{ itinerary },
		{
			fetchRoute: async (points, signal) => {
				const res = await fetch('https://example.com/route', {
					method: 'POST',
					body: JSON.stringify({ points }),
					signal,
				})
				return res.json()
			},
			provider: body.provider,
		}
	)

	return NextResponse.json({
		itineraries: merged.itineraries,
		route,
	})
}
