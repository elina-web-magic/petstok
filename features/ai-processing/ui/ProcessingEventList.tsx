'use client'

import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { stepLabels } from '../constants'
import type { ProcessingEvent, ProcessingStep } from '../types'

type ProcessingEventListProps = {
	events: ProcessingEvent[]
	currentStep: ProcessingStep | null
}

export const ProcessingEventList = ({ events, currentStep }: ProcessingEventListProps) => {
	return (
		<ScrollArea className="h-72 w-full rounded-xl border bg-background">
			<div className="flex flex-col gap-3 p-4">
				{events.length === 0 ? (
					<div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
						No processing events yet.
					</div>
				) : (
					events.map((event, index) => {
						const isLatest = index === events.length - 1
						const isCurrent = currentStep === event.step

						return (
							<div
								key={`${event.step}-${event.timestamp}-${index}`}
								className={cn(
									'flex items-start justify-between gap-3 rounded-xl border p-3 transition-colors',
									isLatest && 'border-primary bg-primary/5'
								)}
							>
								<div className="min-w-0 flex-1">
									<div className="flex items-center gap-2">
										<span
											className={cn(
												'h-2.5 w-2.5 rounded-full bg-muted-foreground/40',
												isCurrent && 'bg-primary'
											)}
										/>
										<p className="truncate text-sm font-medium">{stepLabels[event.step]}</p>
									</div>

									<p className="mt-1 text-xs text-muted-foreground">{event.timestamp}</p>
								</div>

								<Badge
									variant={event.step === 'error' ? 'destructive' : 'secondary'}
									className="shrink-0"
								>
									{isLatest ? 'Latest' : 'Done'}
								</Badge>
							</div>
						)
					})
				)}
			</div>
		</ScrollArea>
	)
}
