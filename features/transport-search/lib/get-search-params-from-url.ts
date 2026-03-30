import type { TransportSearchParams } from '../types'

type SearchParamsLike = {
	get: (key: string) => string | null
}

export const getSearchParamsFromUrl = (searchParams: SearchParamsLike): TransportSearchParams => {
	return {
		from: searchParams.get('from') ?? '',
		to: searchParams.get('to') ?? '',
		date: searchParams.get('date') ?? '',
		passengers: Number(searchParams.get('passengers') ?? 1),
	}
}
