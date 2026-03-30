'use client'

import { useQueryClient } from '@tanstack/react-query'
import { BusFront, Clock3, Route, Ship, Ticket, TrainFront } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { STALE_TIME } from '../constants'
import { useRoute } from '../hooks/use-route'
import { getSearchParamsFromUrl } from '../lib/get-search-params-from-url'
import type {
	NormalizedGeometry,
	NormalizedItinerary,
	NormalizedTransportSegment,
	TransportSearchResult,
} from '../types'

type TransportSearchWorkbenchProps = {
	results: TransportSearchResult[]
	isLoading: boolean
	isError: boolean
}

const RouteMap = dynamic<NormalizedGeometry>(() => import('./RouteMap'), {
	ssr: false,
	loading: () => (
		<div className="flex h-[550px] w-full items-center justify-center bg-muted/20">
			<Spinner />
		</div>
	),
})

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
	const searchParams = useSearchParams()
	const { from, to } = getSearchParamsFromUrl(searchParams)
	const [itinerary, setItinerary] = useState<NormalizedItinerary | null>(null)
	const [errorId, setErrorId] = useState<string | null>(null)
	const queryClient = useQueryClient()

	useEffect(() => {
		if (errorId) {
			const timer = setTimeout(() => setErrorId(null), 3000)
			return () => clearTimeout(timer)
		}
	}, [errorId])

	const {
		data,
		isLoading: isRouteLoading,
		error: routeError,
	} = useRoute({
		itinerary,
	})

	const preloadRoute = async (itinerary: NormalizedItinerary, resultId: string) => {
		if (!itinerary || !itinerary.itineraryId) {
			setErrorId(resultId)
			return
		}

		setErrorId(null)

		await queryClient.prefetchQuery({
			queryKey: ['route', itinerary.itineraryId],
			queryFn: async () => {
				const res = await fetch(`/api/transport/route`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ itinerary }),
				})

				if (!res.ok) {
					throw new Error('Failed to preload route')
				}

				return res.json()
			},
			staleTime: STALE_TIME,
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
											{from} → {to}
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

							<div className="TransportSearchWorkbench__ResultActions relative flex flex-col items-start pt-2">
								{errorId === item.id && (
									<span className="absolute -top-3 left-0 text-[10px] font-bold text-destructive uppercase tracking-tight bg-background/80 px-1 rounded">
										Error: Itinerary ID not found
									</span>
								)}
								<div className="flex items-center justify-between gap-3 w-full">
									<Button
										type="button"
										className="TransportSearchWorkbench__ResultButton w-full sm:w-auto"
										disabled={
											isRouteLoading && itinerary?.itineraryId === item.itinerary?.itineraryId
										}
										onMouseEnter={() => preloadRoute(item.itinerary, item.id)}
										onFocus={() => preloadRoute(item.itinerary, item.id)}
										onClick={() => {
											if (!item.itinerary) {
												setErrorId(item.id)
												return
											}
											setItinerary(item.itinerary)
										}}
									>
										{isRouteLoading && itinerary?.itineraryId === item.itinerary?.itineraryId ? (
											<>
												<Spinner data-icon="inline-start" className="h-4 w-4" />
												Loading...
											</>
										) : (
											'Select route'
										)}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
			<Dialog
				open={Boolean(itinerary)}
				onOpenChange={(open) => {
					if (!open) setItinerary(null)
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
								<div className="MapDetails flex flex-col gap-4">
									<div className="grid grid-cols-3 gap-3">
										<Card className="border-border/60 shadow-none">
											<CardContent className="p-4">
												<p className="text-[11px] uppercase tracking-wider text-muted-foreground">
													Segments
												</p>
												<p className="mt-2 text-lg font-semibold">{data.segments.length}</p>
											</CardContent>
										</Card>

										<Card className="border-border/60 shadow-none">
											<CardContent className="p-4">
												<p className="text-[11px] uppercase tracking-wider text-muted-foreground">
													Route points
												</p>
												<p className="mt-2 text-lg font-semibold">{data.geometry.points.length}</p>
											</CardContent>
										</Card>

										<Card className="border-border/60 shadow-none">
											<CardContent className="p-4">
												<p className="text-[11px] uppercase tracking-wider text-muted-foreground">
													Itinerary
												</p>
												<p className="mt-2 text-sm font-semibold uppercase tracking-widest">
													{data.itineraryId.slice(0, 8)}
												</p>
											</CardContent>
										</Card>
									</div>

									<Tabs defaultValue="map" className="w-full MapDetails_Tab">
										<TabsList className="grid w-full grid-cols-2">
											<TabsTrigger className="MapDetails_Tab_Map" value="map">
												Map
											</TabsTrigger>
											<TabsTrigger className="MapDetails_Tab_Details" value="details">
												Details
											</TabsTrigger>
										</TabsList>

										<TabsContent value="map" className="mt-4">
											<div className="rounded-xl overflow-hidden border border-border shadow-sm">
												<RouteMap points={data.geometry.points} />
											</div>
										</TabsContent>

										<TabsContent value="details" className="mt-4 MapDetails_TabContent">
											<Card className="border-border/60 shadow-none">
												<CardContent className="p-4">
													<div className="flex flex-col gap-4">
														{data.segments.map(
															(segment: NormalizedTransportSegment, index: number) => (
																<div
																	key={segment.segmentId}
																	className={`MapDetails_Tab flex flex-col gap-2 ${segment.segmentId}`}
																>
																	<div className="flex items-center justify-between gap-3">
																		<div>
																			<p className="text-sm font-semibold">
																				{segment.origin.name} → {segment.destination.name}
																			</p>
																			<p className="text-xs text-muted-foreground uppercase tracking-wide">
																				{segment.provider}
																			</p>
																		</div>

																		<Badge variant="outline">{segment.durationMinutes} min</Badge>
																	</div>

																	<div className="grid grid-cols-2 gap-3 text-sm">
																		<div className="rounded-md bg-muted/40 p-3">
																			<p className="text-[11px] uppercase tracking-wider text-muted-foreground">
																				Departure
																			</p>
																			<p className="mt-1 font-medium">
																				{segment.departureAt.localDisplay}
																			</p>
																		</div>

																		<div className="rounded-md bg-muted/40 p-3">
																			<p className="text-[11px] uppercase tracking-wider text-muted-foreground">
																				Arrival
																			</p>
																			<p className="mt-1 font-medium">
																				{segment.arrivalAt.localDisplay}
																			</p>
																		</div>
																	</div>

																	{index < data.segments.length - 1 && <Separator />}
																</div>
															)
														)}
													</div>
												</CardContent>
											</Card>
										</TabsContent>
									</Tabs>
								</div>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
