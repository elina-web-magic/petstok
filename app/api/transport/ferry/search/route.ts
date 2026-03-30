import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url)
	const from = searchParams.get('portFrom') || 'Berlin'
	const to = searchParams.get('portTo') || 'Paris'

	return NextResponse.json({
		results: [
			{
				sailingId: 'ferry-1',
				start: '2026-05-10T06:45:00.000Z',
				end: '2026-05-10T18:00:00.000Z',
				origin: from,
				destination: to,
				fareText: '€54.90',
			},
			{
				sailingId: 'ferry-2',
				start: '2026-05-10T11:30:00.000Z',
				end: '2026-05-10T22:10:00.000Z',
				origin: from,
				destination: to,
				fareText: '€61.90',
			},
		],
	})
}
