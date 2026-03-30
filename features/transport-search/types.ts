export type TransportSearchFormValue = {
	from: string
	to: string
	date: string
}

export type TransportSearchParams = {
	passengers: number
} & TransportSearchFormValue

export type RawRoutePoint = {
	lat: number | null
	lng: number | null
}

export type RoutePoint = {
	lat: number
	lng: number
}

export type GoogleGeometryInput = {
	encodedPolyline: string
}

export type MapboxGeometryInput = {
	coordinates: [number, number][]
}

export type GetRouteForItineraryInput = {
	itinerary: NormalizedItinerary
}

export type GetRouteForItineraryDeps = {
	provider: MapProviders
}

export type AdaptGeometryInput =
	| {
			provider: 'google'
			geometry: GoogleGeometryInput
	  }
	| {
			provider: 'mapbox'
			geometry: MapboxGeometryInput
	  }

export type ShouldApplySearchResponseParams = {
	responseRequestId: SearchRequestId
	latestRequestId: SearchRequestId | null
}

export type MergeProviderItinerariesInput = {
	providers: ProviderMergeItem[]
	sortBy: 'fastest' | 'earliest-departure'
}

export type MergeProviderItinerariesResult = {
	itineraries: NormalizedItinerary[]
	partial: boolean
	failedProviders: string[]
	timedOutProviders: string[]
}

export type NormalizedGeometry = {
	points: RoutePoint[]
}

export type TrainSearchParams = Omit<TransportSearchParams, 'passengers'> & {
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
	itinerary: NormalizedItinerary
}

export type NormalizeItineraryInput = {
	itineraryId: string
	segments: NormalizedTransportSegment[]
}

export type NormalizeDateTimeInput = {
	raw: string
	timezone?: string
	baseDateIso?: string
}

export type NormalizedItinerary = {
	itineraryId: string
	segments: NormalizedTransportSegment[]
	totalDurationMinutes: number
}

export type SearchRequestId = string

export type ProviderNormalizedSearchData = {
	results: TransportSearchResult[]
	itineraries: NormalizedItinerary[]
}

export type TransportSearchResponse = {
	results: TransportSearchResult[]
	partial: boolean
	failedProviders: string[]
	timedOutProviders: string[]
	cachedProviders: string[]
}

export type ProviderSearchTask = {
	provider: TransportProvider
	request: Promise<ProviderNormalizedSearchData>
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

export type NormalizedDateTime = {
	iso: string
	timezone: string
	localDisplay: string
	dayOffset: number
}

export type NormalizedLocation = {
	id: string
	name: string
} & RawRoutePoint

export type NormalizedTransportSegment = {
	provider: string
	segmentId: string
	origin: NormalizedLocation
	destination: NormalizedLocation
	departureAt: NormalizedDateTime
	arrivalAt: NormalizedDateTime
	durationMinutes: number
}

type RawProviderSegment = {
	id: string
	origin: NormalizedLocation
	destination: NormalizedLocation
	departureAt: string
	arrivalAt: string
	departureTimezone?: string
	arrivalTimezone?: string
}

export type RawProviderItinerary = {
	id: string
	segments: RawProviderSegment[]
}

export type NormalizeSearchResponseInput = {
	provider: string
	itineraries: RawProviderItinerary[]
}

export type BuildRouteForItineraryInput = {
	itineraryId: string
}

export type BuildRouteForItineraryResult = {
	itineraryId: string
	segments: NormalizedItinerary['segments']
	geometry: {
		points: RoutePoint[]
	}
}

export type ProviderCacheEntry = {
	results: TransportSearchResult[]
	itineraries: NormalizedItinerary[]
	updatedAt: number
}

export type BuildRoutePayloadResult = {
	points: RoutePoint[]
}
