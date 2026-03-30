import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url)
	const from = searchParams.get('originId') || 'Berlin'
	const to = searchParams.get('destinationId') || 'Paris'

	return NextResponse.json({
		items: [
			{
				id: 'bus-1',
				departure_time: '2026-05-10T07:15:00.000Z',
				arrival_time: '2026-05-10T15:40:00.000Z',
				from_label: from,
				to_label: to,
				price_label: '€39.90',
			},
			{
				id: 'bus-2',
				departure_time: '2026-05-10T09:00:00.000Z',
				arrival_time: '2026-05-10T17:20:00.000Z',
				from_label: from,
				to_label: to,
				price_label: '€44.90',
			},
		],
	})
}
