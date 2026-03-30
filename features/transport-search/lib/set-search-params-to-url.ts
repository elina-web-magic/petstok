import type { TransportSearchParams } from '../types'

type SetSearchParamsToUrlProps = {
	params: TransportSearchParams
	searchParams: URLSearchParams
	pathname: string
}

export const setSearchParamsToUrl = ({
	params,
	searchParams,
	pathname,
}: SetSearchParamsToUrlProps): string => {
	const next = new URLSearchParams(searchParams.toString())

	next.set('from', params.from)
	next.set('to', params.to)
	next.set('date', params.date)
	next.set('passengers', String(params.passengers))

	return `${pathname}?${next.toString()}`
}
