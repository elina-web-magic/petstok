import type { BusSearchParams, TransportSearchParams } from '../types'
import { cleanQueryParams } from '../utils/url'

export const mapTransportSearchToBusParams = (params: TransportSearchParams): BusSearchParams => {
	const { from, to, date, passengers } = params

	return {
		originId: from,
		destinationId: to,
		travelDate: date,
		pax: passengers.toString(),
	}
}

export const buildBusQueryParams = (filters: BusSearchParams): URLSearchParams =>
	cleanQueryParams({
		destinationId: filters.destinationId,
		originId: filters.originId,
		pax: filters.pax,
		travelDate: filters.travelDate,
	})
