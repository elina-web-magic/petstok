import type { AdaptGeometryInput, NormalizedGeometry } from '../types'

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
