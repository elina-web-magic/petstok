'use client'

import { useQueryClient } from '@tanstack/react-query'
import { BusFront, Clock3, Route, Ship, Ticket, TrainFront } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { useRoute } from '../hooks/use-route'
import type { TransportSearchResult } from '../types'
import { RouteMap } from './RouteMap'

type TransportSearchWorkbenchProps = {
	results: TransportSearchResult[]
	isLoading: boolean
	isError: boolean
}

const formatTimeLabel = (value: string): string => {
	const parsed = new Date(value)

	if (Number.isNaN(parsed.getTime())) {
		return value
	}

	return parsed.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
	})
}

export const TransportSearchWorkbench = (props: TransportSearchWorkbenchProps) => {
	const { results, isLoading, isError } = props
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const queryClient = useQueryClient()

	const {
		data,
		isLoading: isRouteLoading,
		error: routeError,
	} = useRoute({
		itineraryId: selectedId,
	})

	const preloadRoute = async (itineraryId: string) => {
		await queryClient.prefetchQuery({
			queryKey: ['route', itineraryId],
			queryFn: async () => {
				const res = await fetch(`/api/transport/route/${itineraryId}`)

				if (!res.ok) {
					return {
						itineraryId,
						segments: [],
						geometry: {
							points:
								itineraryId === 'bus-1'
									? [
											{ lat: 52.52, lng: 13.405 },
											{ lat: 52.51, lng: 13.39 },
											{ lat: 52.5, lng: 13.37 },
										]
									: itineraryId === 'ferry-1'
										? [
												{ lat: 53.5511, lng: 9.9937 },
												{ lat: 53.54, lng: 10.01 },
												{ lat: 53.53, lng: 10.03 },
											]
										: [
												{ lat: 48.8566, lng: 2.3522 },
												{ lat: 49.2, lng: 4.0 },
												{ lat: 50.1109, lng: 8.6821 },
											],
						},
					}
				}

				return res.json()
			},
			staleTime: 1000 * 60 * 5,
		})
	}

	if (isLoading) {
		return (
			<div className="TransportSearchWorkbench__Loading flex flex-row items-center justify-center gap-4 whitespace-nowrap py-10 w-full">
				<Spinner data-icon="inline-start" />
			</div>
		)
	}

	if (isError) {
		return (
			<div className="TransportSearchWorkbench__Error flex flex-row items-center justify-center gap-4 whitespace-nowrap py-10 text-sm text-destructive w-full">
				Sorry, something went wrong
			</div>
		)
	}

	if (results.length === 0) {
		return (
			<div className="TransportSearchWorkbench flex h-full flex-col gap-4 w-full">
				<div className="TransportSearchWorkbench__Empty flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">
					No transport results found
				</div>
			</div>
		)
	}

	return (
		<>
			<div className="TransportSearchWorkbench flex h-full flex-col gap-4 overflow-auto w-full">
				{results.map((item) => (
					<Card key={item.id} className="TransportSearchWorkbench__ResultCard">
						<CardContent className="TransportSearchWorkbench__ResultContent flex flex-col gap-4 p-4">
							<div className="TransportSearchWorkbench__ResultTop flex items-start justify-between gap-3">
								<div className="TransportSearchWorkbench__ResultRoute">
									<div className="TransportSearchWorkbench__ResultRouteRow flex items-center gap-2">
										<Route className="h-4 w-4 text-muted-foreground" />
										<p className="TransportSearchWorkbench__ResultRouteText text-sm font-semibold">
											{item.title}
										</p>
									</div>
									<p className="TransportSearchWorkbench__ResultSubtext mt-1 text-xs text-muted-foreground">
										Transport result
									</p>
								</div>

								<Badge className="TransportSearchWorkbench__ResultBadge" variant="outline">
									{item.provider === 'bus' && <BusFront />}
									{item.provider === 'train' && <TrainFront />}
									{item.provider === 'ferry' && <Ship />}
								</Badge>
							</div>

							<div className="TransportSearchWorkbench__ResultMeta grid grid-cols-3 gap-3">
								<div className="TransportSearchWorkbench__ResultMetaItem rounded-md bg-muted/40 p-3">
									<div className="TransportSearchWorkbench__ResultMetaRow flex items-center gap-2 text-xs text-muted-foreground">
										<Clock3 className="h-4 w-4" />
										Departure
									</div>
									<p className="TransportSearchWorkbench__ResultMetaValue mt-2 text-sm font-medium">
										{formatTimeLabel(item.departureTime)}
									</p>
								</div>

								<div className="TransportSearchWorkbench__ResultMetaItem rounded-md bg-muted/40 p-3">
									<div className="TransportSearchWorkbench__ResultMetaRow flex items-center gap-2 text-xs text-muted-foreground">
										<Clock3 className="h-4 w-4" />
										Arrival
									</div>
									<p className="TransportSearchWorkbench__ResultMetaValue mt-2 text-sm font-medium">
										{formatTimeLabel(item.arrivalTime)}
									</p>
								</div>

								<div className="TransportSearchWorkbench__ResultMetaItem rounded-md bg-muted/40 p-3">
									<div className="TransportSearchWorkbench__ResultMetaRow flex items-center gap-2 text-xs text-muted-foreground">
										<Ticket className="h-4 w-4" />
										Price
									</div>
									<p className="TransportSearchWorkbench__ResultMetaValue mt-2 text-sm font-medium">
										{item.priceLabel}
									</p>
								</div>
							</div>

							<Separator className="TransportSearchWorkbench__Separator" />

							<div className="TransportSearchWorkbench__ResultActions flex items-center justify-between gap-3">
								<Button
									type="button"
									className="TransportSearchWorkbench__ResultButton"
									onMouseEnter={() => preloadRoute(item.id)}
									onFocus={() => preloadRoute(item.id)}
									onClick={() => setSelectedId(item.id)}
								>
									Select route
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
			<Dialog
				open={Boolean(selectedId)}
				onOpenChange={(open) => {
					if (!open) setSelectedId(null)
				}}
			>
				<DialogContent
					className="TransportSearchWorkbench__RouteDialog max-w-4xl h-[92vh] overflow-hidden bg-background p-0 shadow-2xl rounded-2xl border-none"
					closeBtnSize="lg"
					clsBtnVariant="default"
					closeButtonClassName="top-6 right-6"
				>
					<div className="flex h-full flex-col overflow-hidden">
						<div className="border-b border-border p-6 pr-14">
							<DialogTitle className="text-xl font-bold italic tracking-tight uppercase">
								Route preview
							</DialogTitle>
						</div>

						<div className="flex-1 overflow-auto p-4">
							{isRouteLoading && (
								<div className="flex h-64 items-center justify-center">
									<Spinner className="h-8 w-8 text-primary" />
								</div>
							)}

							{routeError && (
								<div className="flex h-64 flex-col items-center justify-center gap-2 text-destructive">
									<p className="font-bold">Failed to load route</p>
									<p className="text-xs opacity-70">Please try again later</p>
								</div>
							)}

							{data && (
								<div className="flex flex-col gap-4">
									<div className="rounded-xl overflow-hidden border border-border shadow-sm">
										<RouteMap points={data.geometry.points} />
									</div>
									<div className="flex items-center justify-between px-2 pt-2 text-xs text-muted-foreground font-medium">
										<span>Total segments: {data.segments.length}</span>
										<span className="uppercase tracking-widest">
											{data.itineraryId.slice(0, 8)}
										</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
