import { MS_IN_MINUTE } from '../constants'
import type { NormalizedTransportSegment } from '../types/normalized-transport'
import { normalizeDateTime } from './normalize-date-time'
import { normalizeLocation } from './normalize-location'

type RawTransportLocation = {
	id?: string
	name?: string
	lat?: number
	lng?: number
}

type NormalizeTransportSegmentInput = {
	provider: string
	segmentId: string
	origin: RawTransportLocation
	destination: RawTransportLocation
	departureAtRaw: string
	arrivalAtRaw: string
	departureTimezone?: string
	arrivalTimezone?: string
}

export const normalizeTransportSegment = ({
	provider,
	segmentId,
	origin,
	destination,
	departureAtRaw,
	arrivalAtRaw,
	departureTimezone,
	arrivalTimezone,
}: NormalizeTransportSegmentInput): NormalizedTransportSegment => {
	const normalizedOrigin = normalizeLocation(origin)
	const normalizedDestination = normalizeLocation(destination)

	const normalizedDepartureAt = normalizeDateTime({
		raw: departureAtRaw,
		timezone: departureTimezone,
	})

	const normalizedArrivalAt = normalizeDateTime({
		raw: arrivalAtRaw,
		timezone: arrivalTimezone,
		baseDateIso: normalizedDepartureAt.iso,
	})

	const departureAtTime = new Date(normalizedDepartureAt.iso).getTime()
	const arrivalAtTime = new Date(normalizedArrivalAt.iso).getTime()
	const computedDuration = Math.floor((arrivalAtTime - departureAtTime) / MS_IN_MINUTE)
	const durationMinutes = Math.max(0, computedDuration)

	return {
		provider,
		segmentId,
		origin: normalizedOrigin,
		destination: normalizedDestination,
		departureAt: normalizedDepartureAt,
		arrivalAt: normalizedArrivalAt,
		durationMinutes,
	}
}
