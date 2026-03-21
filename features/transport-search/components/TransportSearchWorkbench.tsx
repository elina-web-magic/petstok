'use client'

import { BusFront, Clock3, Route, Ship, Ticket, TrainFront } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import type { TransportSearchResult } from '../types'

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
							<Button type="button" className="TransportSearchWorkbench__ResultButton">
								Select route
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
