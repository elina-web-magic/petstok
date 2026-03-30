'use client'

import { AlertCircle, MapPinOff } from 'lucide-react'
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'
import type { NormalizedGeometry } from '../types'

const RouteMap = ({ points }: NormalizedGeometry) => {
	if (!points.length) {
		return (
			<div className="RouteMap relative w-full h-[550px] rounded-xl overflow-hidden border border-border bg-muted/30">
				{/* Decorative Mock Map Pattern (CSS/SVG) to avoid Leaflet conflicts */}
				<div
					className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 35c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM16 32c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm34 50c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm48 10c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM2 71c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm88-43c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm-50 49c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm34-31c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm-72 3c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm96 46c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM31 15c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%23000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
					}}
				/>

				{/* Error Message Overlay */}
				<div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
					<div className="p-3 rounded-full bg-background/50 border border-border shadow-sm">
						<MapPinOff className="w-6 h-6 text-muted-foreground" />
					</div>
					<div className="space-y-1">
						<p className="font-semibold text-sm tracking-tight italic uppercase">
							Route not available
						</p>
						<p className="text-xs text-muted-foreground max-w-[200px]">
							Geometry data could not be retrieved for this itinerary.
						</p>
					</div>
				</div>
			</div>
		)
	}

	const hasValidCoordinates = points.every(
		(p) => typeof p.lat === 'number' && typeof p.lng === 'number' && !Number.isNaN(p.lat)
	)

	if (!hasValidCoordinates) {
		return (
			<div className="flex flex-col items-center justify-center w-full h-[550px] gap-3 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive p-6 text-center">
				<AlertCircle className="w-8 h-8" />
				<div className="space-y-1">
					<p className="font-bold text-sm tracking-tight uppercase italic">Invalid map data</p>
					<p className="text-xs opacity-70 max-w-[200px]">
						Some coordinates in this route are invalid or missing.
					</p>
				</div>
			</div>
		)
	}

	const center = points[0]

	const positions = points.map((p) => [p.lat, p.lng] as [number, number])

	return (
		<div className="w-full h-[550px] rounded overflow-hidden">
			<MapContainer
				center={[center.lat, center.lng]}
				zoom={6}
				scrollWheelZoom={false}
				className="w-full h-full"
			>
				<TileLayer
					attribution="&copy; OpenStreetMap"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<Polyline positions={positions} />
			</MapContainer>
		</div>
	)
}

export default RouteMap
