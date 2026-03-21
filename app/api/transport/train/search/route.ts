import { NextResponse } from 'next/server'

export const GET = async (): Promise<Response> => {
	return NextResponse.json({
		routes: [
			{
				journeyId: 'train-1',
				depTime: '2026-05-10T08:30:00.000Z',
				arrTime: '2026-05-10T14:10:00.000Z',
				originName: 'Berlin',
				destinationName: 'Paris',
				price: 49.9,
				currency: 'EUR',
			},
			{
				journeyId: 'train-2',
				depTime: '2026-05-10T10:00:00.000Z',
				arrTime: '2026-05-10T16:30:00.000Z',
				originName: 'Berlin',
				destinationName: 'Paris',
				price: 59.9,
				currency: 'EUR',
			},
		],
	})
}
