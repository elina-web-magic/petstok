import type { TransportProvider } from './types'

export const TRANSPORT_API_ENDPOINTS = {
	bus: '/api/transport/bus/search',
	train: '/api/transport/train/search',
	ferry: '/api/transport/ferry/search',
} as const

export const ALL_TRANSPORT_PROVIDERS = [
	'bus',
	'train',
	'ferry',
] as const satisfies readonly TransportProvider[]

export const PROVIDER_TIMEOUT_MS = 4000

export const MS_IN_SECOND = 1000
export const SECONDS_IN_MINUTE = 60
export const MINUTES_IN_HOUR = 60
export const HOURS_IN_DAY = 24

export const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND
export const MS_IN_HOUR = MINUTES_IN_HOUR * MS_IN_MINUTE
export const MS_IN_DAY = HOURS_IN_DAY * MS_IN_HOUR

