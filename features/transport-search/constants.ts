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

export const MS_IN_SECOND = 1000
export const MS_IN_MINUTE = 60 * MS_IN_SECOND
export const MS_IN_HOUR = 60 * MS_IN_MINUTE
export const MS_IN_DAY = 24 * MS_IN_HOUR

export const PROVIDER_TIMEOUT_MS = 4 * MS_IN_SECOND
