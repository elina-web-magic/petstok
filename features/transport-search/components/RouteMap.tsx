'use client'

import type { NormalizedGeometry, RoutePoint } from '../types'

const normalizePoints = (props: RoutePoint[]) => {
	if (props.length === 0) return []

	const lats = props.map((p) => p.lat)
	const lngs = props.map((p) => p.lng)

	const minLat = Math.min(...lats)
	const maxLat = Math.max(...lats)
	const minLng = Math.min(...lngs)
	const maxLng = Math.max(...lngs)

	return props.map((p) => ({
		x: ((p.lng - minLng) / (maxLng - minLng || 1)) * 100,
		y: ((p.lat - minLat) / (maxLat - minLat || 1)) * 100,
	}))
}

export const RouteMap = (props: NormalizedGeometry) => {
	const { points } = props
	const normalized = normalizePoints(points)

	const path = normalized.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${100 - p.y}`).join(' ')

	return (
		<div className="w-full h-[300px] bg-black rounded overflow-hidden">
			<svg viewBox="0 0 100 100" className="w-full h-full">
				<title>RouteMap</title>
				<path d={path} stroke="white" strokeWidth="1" fill="none" />
			</svg>
		</div>
	)
}
