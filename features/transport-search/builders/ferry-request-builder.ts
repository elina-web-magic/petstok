import type { FerrySearchParams, TransportSearchParams } from '../types'
import { cleanQueryParams } from '../utils/url'

export const mapTransportSearchToFerryParams = (
	params: TransportSearchParams
): FerrySearchParams => {
	const { from, to, date, passengers } = params

	return {
		portFrom: from,
		portTo: to,
		departureDate: date,
		passengerCount: passengers.toString(),
	}
}

export const buildFerryQueryParams = (filters: FerrySearchParams): URLSearchParams =>
	cleanQueryParams({
		portFrom: filters.portFrom,
		portTo: filters.portTo,
		departureDate: filters.departureDate,
		passengerCount: filters.passengerCount,
	})
