import type { NormalizedLocation } from '../types'

const LOCATION_COORDINATES: Record<string, { lat: number; lng: number }> = {
	'hamburg port': { lat: 53.5461, lng: 9.9661 },
	'copenhagen port': { lat: 55.6929, lng: 12.5993 },
	'berlin hbf': { lat: 52.5251, lng: 13.3694 },
	'munich hbf': { lat: 48.1402, lng: 11.5586 },
	'paris gare du nord': { lat: 48.8809, lng: 2.3553 },
	'london st pancras': { lat: 51.5319, lng: -0.1263 },
}

const toLocationId = (value: string): string => {
	return value.trim().toLowerCase().replace(/\s+/g, '-')
}

export const resolveLocation = (name: string): NormalizedLocation => {
	const normalizedName = name.trim()
	const key = normalizedName.toLowerCase()
	const coords = LOCATION_COORDINATES[key]

	return {
		id: toLocationId(normalizedName),
		name: normalizedName,
		lat: coords?.lat ?? null,
		lng: coords?.lng ?? null,
	}
}
