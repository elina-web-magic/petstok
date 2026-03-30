import { type NextRequest, NextResponse } from 'next/server'
import { normalizeSearchResponse } from '@/features/transport-search/normalizers/normalize-search-response'
import { getRouteForItinerary } from '@/features/transport-search/services/get-route-for-itinerary'
import { mergeProviderItineraries } from '@/features/transport-search/services/merge-provider-itineraries'

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

	const route = await getRouteForItinerary({ itinerary }, { provider: body.provider })

	return NextResponse.json({
		itineraries: merged.itineraries,
		route,
	})
}
