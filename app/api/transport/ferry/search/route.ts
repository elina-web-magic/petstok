import { NextResponse } from 'next/server'

export const GET = async () => {
	return NextResponse.json({
		results: [
			{
				sailingId: 'ferry-1',
				start: '2026-05-10T06:45:00.000Z',
				end: '2026-05-10T18:00:00.000Z',
				origin: 'Berlin',
				destination: 'Paris',
				fareText: '€54.90',
			},
			{
				sailingId: 'ferry-2',
				start: '2026-05-10T11:30:00.000Z',
				end: '2026-05-10T22:10:00.000Z',
				origin: 'Berlin',
				destination: 'Paris',
				fareText: '€61.90',
			},
		],
	})
}
