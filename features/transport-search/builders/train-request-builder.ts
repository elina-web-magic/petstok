import type { TrainSearchParams, TransportSearchParams } from '../types'
import { cleanQueryParams } from '../utils/url'

export const mapTransportSearchToTrainParams = (
	params: TransportSearchParams
): TrainSearchParams => {
	const { from, to, date, passengers } = params

	return {
		from,
		to,
		date,
		passengers: passengers.toString(),
	}
}

export const buildTrainQueryParams = (filters: TrainSearchParams): URLSearchParams =>
	cleanQueryParams({
		date: filters.date,
		from: filters.from,
		to: filters.to,
		passengers: filters.passengers,
	})
