'use client'

import { CalendarDays, Clock3, MapPinned, RefreshCw, Route, Ticket } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type TransportSearchWorkbenchProps = {
	query: string
}

const providerItems = ['Bus', 'Train', 'Ferry'] as const
const resultItems = [1, 2, 3, 4]

export const TransportSearchWorkbench = ({ query }: TransportSearchWorkbenchProps) => {
	return (
		<div className="TransportSearchWorkbench flex h-full flex-col gap-4">
			<Card className="TransportSearchWorkbench__Summary">
				<CardHeader className="TransportSearchWorkbench__SummaryHeader pb-3">
					<CardTitle className="TransportSearchWorkbench__SummaryTitle text-base">
						Transport search
					</CardTitle>
				</CardHeader>
				<CardContent className="TransportSearchWorkbench__SummaryContent flex flex-col gap-3">
					<div className="TransportSearchWorkbench__Query rounded-lg border border-border bg-muted/40 p-3">
						<p className="TransportSearchWorkbench__QueryLabel text-xs text-muted-foreground">
							Active query
						</p>
						<p className="TransportSearchWorkbench__QueryValue text-sm font-medium">
							{query || 'Start typing to search routes'}
						</p>
					</div>

					<div className="TransportSearchWorkbench__Meta grid grid-cols-2 gap-3">
						<div className="TransportSearchWorkbench__MetaItem rounded-lg border border-border p-3">
							<div className="TransportSearchWorkbench__MetaRow flex items-center gap-2 text-xs text-muted-foreground">
								<MapPinned className="h-4 w-4" />
								Route
							</div>
							<p className="TransportSearchWorkbench__MetaValue mt-2 text-sm font-medium">
								Berlin → Paris
							</p>
						</div>

						<div className="TransportSearchWorkbench__MetaItem rounded-lg border border-border p-3">
							<div className="TransportSearchWorkbench__MetaRow flex items-center gap-2 text-xs text-muted-foreground">
								<CalendarDays className="h-4 w-4" />
								Date
							</div>
							<p className="TransportSearchWorkbench__MetaValue mt-2 text-sm font-medium">10 May</p>
						</div>
					</div>

					<Tabs defaultValue="all" className="TransportSearchWorkbench__Tabs w-full">
						<TabsList className="TransportSearchWorkbench__TabsList grid w-full grid-cols-4">
							<TabsTrigger className="TransportSearchWorkbench__TabsTrigger" value="all">
								All
							</TabsTrigger>
							{providerItems.map((provider) => (
								<TabsTrigger
									key={provider}
									className="TransportSearchWorkbench__TabsTrigger"
									value={provider.toLowerCase()}
								>
									{provider}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>

					<div className="TransportSearchWorkbench__ProviderRow flex flex-wrap gap-2">
						{providerItems.map((provider) => (
							<Badge
								key={provider}
								variant="secondary"
								className="TransportSearchWorkbench__ProviderBadge"
							>
								{provider}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>

			<div className="TransportSearchWorkbench__Results flex flex-1 flex-col gap-3 overflow-auto">
				<div className="TransportSearchWorkbench__ResultsHeader flex items-center justify-between gap-3">
					<div className="TransportSearchWorkbench__ResultsCopy">
						<p className="TransportSearchWorkbench__ResultsTitle text-sm font-semibold">
							Search results
						</p>
						<p className="TransportSearchWorkbench__ResultsDescription text-xs text-muted-foreground">
							Normalized cards for multi-provider results
						</p>
					</div>

					<Button
						type="button"
						variant="outline"
						size="sm"
						className="TransportSearchWorkbench__Refresh"
					>
						<RefreshCw className="h-4 w-4" />
						Refresh
					</Button>
				</div>

				{resultItems.map((item) => (
					<Card key={item} className="TransportSearchWorkbench__ResultCard">
						<CardContent className="TransportSearchWorkbench__ResultContent flex flex-col gap-4 p-4">
							<div className="TransportSearchWorkbench__ResultTop flex items-start justify-between gap-3">
								<div className="TransportSearchWorkbench__ResultRoute">
									<div className="TransportSearchWorkbench__ResultRouteRow flex items-center gap-2">
										<Route className="h-4 w-4 text-muted-foreground" />
										<p className="TransportSearchWorkbench__ResultRouteText text-sm font-semibold">
											Berlin → Paris
										</p>
									</div>
									<p className="TransportSearchWorkbench__ResultSubtext mt-1 text-xs text-muted-foreground">
										Provider-normalized itinerary card
									</p>
								</div>

								<Badge className="TransportSearchWorkbench__ResultBadge" variant="outline">
									Bus
								</Badge>
							</div>

							<div className="TransportSearchWorkbench__ResultMeta grid grid-cols-3 gap-3">
								<div className="TransportSearchWorkbench__ResultMetaItem rounded-md bg-muted/40 p-3">
									<div className="TransportSearchWorkbench__ResultMetaRow flex items-center gap-2 text-xs text-muted-foreground">
										<Clock3 className="h-4 w-4" />
										Departure
									</div>
									<p className="TransportSearchWorkbench__ResultMetaValue mt-2 text-sm font-medium">
										08:30
									</p>
								</div>

								<div className="TransportSearchWorkbench__ResultMetaItem rounded-md bg-muted/40 p-3">
									<div className="TransportSearchWorkbench__ResultMetaRow flex items-center gap-2 text-xs text-muted-foreground">
										<Clock3 className="h-4 w-4" />
										Arrival
									</div>
									<p className="TransportSearchWorkbench__ResultMetaValue mt-2 text-sm font-medium">
										18:10
									</p>
								</div>

								<div className="TransportSearchWorkbench__ResultMetaItem rounded-md bg-muted/40 p-3">
									<div className="TransportSearchWorkbench__ResultMetaRow flex items-center gap-2 text-xs text-muted-foreground">
										<Ticket className="h-4 w-4" />
										Price
									</div>
									<p className="TransportSearchWorkbench__ResultMetaValue mt-2 text-sm font-medium">
										€49.90
									</p>
								</div>
							</div>

							<Separator className="TransportSearchWorkbench__Separator" />

							<div className="TransportSearchWorkbench__ResultActions flex items-center justify-between gap-3">
								<p className="TransportSearchWorkbench__ResultHint text-xs text-muted-foreground">
									Maps, calendar, retries, and provider merge logic will be added by you
								</p>

								<Button type="button" className="TransportSearchWorkbench__ResultButton">
									Select route
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
