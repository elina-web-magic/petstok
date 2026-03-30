import type { NormalizedLocation } from '../types'

const LOCATION_COORDS: Record<string, { lat: number; lng: number }> = {
	berlin: { lat: 52.52, lng: 13.405 },
	paris: { lat: 48.8566, lng: 2.3522 },
	munich: { lat: 48.1351, lng: 11.582 },
	hamburg: { lat: 53.5511, lng: 9.9937 },
}

const normalizeKey = (value: string) => value.trim().toLowerCase()

export const resolveLocation = (name: string): NormalizedLocation => {
	const key = normalizeKey(name)
	const coords = LOCATION_COORDS[key]

	return {
		id: key,
		name,
		lat: coords?.lat ?? null,
		lng: coords?.lng ?? null,
	}
}
