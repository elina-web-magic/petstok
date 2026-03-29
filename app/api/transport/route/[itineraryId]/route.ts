import { type NextRequest, NextResponse } from 'next/server'
import { buildRouteForItinerary } from '@/features/transport-search/services/build-route-for-itinerary'

type RouteContext = {
	params: Promise<{
		itineraryId: string
	}>
}

export const GET = async (_req: NextRequest, context: RouteContext) => {
	const { itineraryId } = await context.params

	const result = await buildRouteForItinerary({ itineraryId })

	return NextResponse.json(result)
}
