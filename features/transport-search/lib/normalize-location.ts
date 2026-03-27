import type { NormalizedLocation } from '../types/normalized-transport'

type NormalizeLocationInput = {
	id?: string
	name?: string
	lat?: number
	lng?: number
}

export const normalizeLocation = (props: NormalizeLocationInput): NormalizedLocation => {
	const { id: rawId, name: rawName, lat: rawLat, lng: rawLng } = props
	const name = rawName ? rawName.trim() : 'Unknown location'
	const id = rawId ? rawId.trim() : name.toLowerCase().replace(/\s+/g, '-')
	const lat = typeof rawLat === 'number' ? rawLat : null
	const lng = typeof rawLng === 'number' ? rawLng : null

	return {
		id,
		name,
		lat,
		lng,
	}
}
