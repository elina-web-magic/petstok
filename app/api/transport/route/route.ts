import { type NextRequest, NextResponse } from 'next/server'
import { getRouteForItinerary } from '@/features/transport-search/services/get-route-for-itinerary'
import type { NormalizedItinerary } from '@/features/transport-search/types'

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json()

		const itinerary = body.itinerary as NormalizedItinerary

		if (!itinerary) {
			return NextResponse.json({ error: 'Missing itinerary' }, { status: 400 })
		}

		const geometry = await getRouteForItinerary({ itinerary }, { provider: 'google' })

		return NextResponse.json({
			itineraryId: itinerary.itineraryId,
			segments: itinerary.segments,
			geometry,
		})
	} catch (error) {
		const errorInfo = {
			name: error instanceof Error ? error.name : 'Error',
			message: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined,
			...(typeof error === 'object' ? error : {}),
		}

		return NextResponse.json(
			{
				error: 'Failed to build route',
				...errorInfo,
			},
			{ status: 500 }
		)
	}
}
