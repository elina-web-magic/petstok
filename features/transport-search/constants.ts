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
