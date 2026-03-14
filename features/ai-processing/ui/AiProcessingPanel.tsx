'use client'

import { AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { ProcessingState } from '../model/processing/types'
import { stepLabels as statusLabels } from './constants'
import { ProcessingEventList } from './ProcessingEventList'

type AIProcessingPanelProps = {
	state: ProcessingState
}

export const AIProcessingPanel = ({ state }: AIProcessingPanelProps) => {
	const { status, events, isStreaming, error } = state

	return (
		<Card className="mx-auto w-full max-w-[550px] rounded-2xl shadow-sm">
			<CardHeader className="space-y-4">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						<div className="flex items-center gap-2">
							<Sparkles className="h-5 w-5" />
							<CardTitle className="text-base sm:text-lg">AI Video Processing</CardTitle>
						</div>

						<p className="mt-2 text-sm text-muted-foreground">
							Track video analysis progress step by step as backend events arrive.
						</p>
					</div>

					{isStreaming ? (
						<Badge className="shrink-0 gap-1">
							<Loader2 className="h-3.5 w-3.5 animate-spin" />
							Streaming
						</Badge>
					) : status === 'completed' ? (
						<Badge variant="secondary" className="shrink-0 gap-1">
							<CheckCircle2 className="h-3.5 w-3.5" />
							Completed
						</Badge>
					) : error ? (
						<Badge variant="destructive" className="shrink-0 gap-1">
							<AlertCircle className="h-3.5 w-3.5" />
							Failed
						</Badge>
					) : (
						<Badge variant="outline" className="shrink-0">
							Idle
						</Badge>
					)}
				</div>

				<div className="rounded-xl border bg-muted/30 p-4">
					<p className="text-xs uppercase tracking-wide text-muted-foreground">Current status</p>

					<div className="mt-2 flex items-center gap-2">
						<div className="h-2.5 w-2.5 rounded-full bg-primary" />
						<p className="text-sm font-medium">
							{status ? statusLabels[status] : 'Waiting to start'}
						</p>
					</div>
				</div>

				{error ? (
					<div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
						<div className="flex items-start gap-2">
							<AlertCircle className="mt-0.5 h-4 w-4 text-destructive" />
							<div>
								<p className="text-sm font-medium text-destructive">Processing failed</p>
								<p className="mt-1 text-sm text-muted-foreground">{error}</p>
							</div>
						</div>
					</div>
				) : null}

				<Separator />
			</CardHeader>

			<CardContent>
				<ProcessingEventList events={events} currentStep={status} />
			</CardContent>
		</Card>
	)
}
