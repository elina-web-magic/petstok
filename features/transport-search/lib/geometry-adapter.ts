type RoutePoint = {
	lat: number
	lng: number
}

type NormalizedGeometry = {
	points: RoutePoint[]
}

export type GoogleGeometryInput = {
	encodedPolyline: string
}

export type MapboxGeometryInput = {
	coordinates: [number, number][]
}

type AdaptGeometryInput =
	| {
			provider: 'google'
			geometry: GoogleGeometryInput
	  }
	| {
			provider: 'mapbox'
			geometry: MapboxGeometryInput
	  }

export const adaptGeometry = (props: AdaptGeometryInput): NormalizedGeometry => {
	const { provider, geometry } = props

	if (provider === 'google') {
		return {
			points: [],
		}
	}

	if (provider === 'mapbox') {
		return {
			points: geometry.coordinates.map((coordinate) => ({
				lat: coordinate[0],
				lng: coordinate[1],
			})),
		}
	}

	return {
		points: [],
	}
}
