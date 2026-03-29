import type { NormalizedItinerary } from './types/normalized-transport'

export type TransportSearchParams = {
	from: string
	to: string
	date: string
	passengers: number
}

export type TrainSearchParams = {
	from: string
	to: string
	date: string
	passengers: string
}

export type BusSearchParams = {
	originId: string
	destinationId: string
	travelDate: string
	pax: string
}

export type FerrySearchParams = {
	portFrom: string
	portTo: string
	departureDate: string
	passengerCount: string
}

export type TransportProvider = 'bus' | 'train' | 'ferry'

export type TrainRouteApiItem = {
	journeyId: string
	depTime: string
	arrTime: string
	originName: string
	destinationName: string
	price: number
	currency: string
}

export type TrainRoutesApiResponse = {
	routes: TrainRouteApiItem[]
}

export type BusRouteApiItem = {
	id: string
	departure_time: string
	arrival_time: string
	from_label: string
	to_label: string
	price_label: string
}

export type BusRoutesApiResponse = {
	items: BusRouteApiItem[]
}

export type FerryRouteApiItem = {
	sailingId: string
	start: string
	end: string
	origin: string
	destination: string
	fareText: string
}

export type FerryRoutesApiResponse = {
	results: FerryRouteApiItem[]
}

export type TransportSearchResult = {
	id: string
	provider: TransportProvider
	title: string
	from: string
	to: string
	departureTime: string
	arrivalTime: string
	priceLabel: string
}

export type ProviderSearchTask = {
	provider: TransportProvider
	request: Promise<TransportSearchResult[]>
}

export type RoutePoint = {
	lat: number
	lng: number
}

export type MapProviders = 'google' | 'mapbox'

export type RouteRequestProps = {
	points: RoutePoint[]
	signal?: AbortSignal
}

type ProviderMergeStatus = 'success' | 'failed' | 'timeout'

export type ProviderMergeItem = {
	provider: string
	status: ProviderMergeStatus
	itineraries: NormalizedItinerary[]
	errorMessage?: string
}
