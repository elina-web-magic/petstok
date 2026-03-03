'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'

type AiResult = {
	tags: string[]
	isAlice: boolean
	isBlindCat: boolean
	confidence: {
		alice: number
		blindcat: number
	}
	rationale: string
}

const logger = new Logger({
	scope: 'ai',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

const AiDebugPanel = () => {
	const [result, setResult] = useState<AiResult | null>(null)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const handleAnalyze = async () => {
		setLoading(true)
		setErrorMessage(null)

		const requestId = String(Date.now())
		const log = logger.child({ requestId })

		log.info('Analyze started')
		try {
			const res = await fetch('/api/ai/pet-tags', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					videoUrl:
						'https://res.cloudinary.com/dxa5thp2x/video/upload/v1772541271/IMG_3993_bclpb8.mov',
					aliceReferenceImageUrls: [
						'https://res.cloudinary.com/dxa5thp2x/image/upload/v1772541610/IMG_2537_rqpnm7.jpg',
						'https://res.cloudinary.com/dxa5thp2x/image/upload/v1772541608/IMG_4020_urdwom.png',
						'https://res.cloudinary.com/dxa5thp2x/image/upload/v1772541609/IMG_2805_ztnzlc.jpg',
					],
				}),
			})

			if (!res.ok) {
				const text = await res.text()
				throw new Error(`AI route failed: ${res.status} ${text}`)
			}

			const data = (await res.json()) as AiResult

			setResult(data)

			log.info('Analyze success', {
				tagsCount: data.tags.length,
				isAlice: data.isAlice,
				isBlindCat: data.isBlindCat,
			})
		} catch (error) {
			setResult(null)

			const message = error instanceof Error ? error.message : 'Unknown error'
			setErrorMessage(message)

			log.error('Analyze failed', { message }, error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="rounded-lg border border-[var(--ps-border)] bg-[var(--ps-card)] p-3 space-y-3">
			<div className="flex items-center justify-between gap-3">
				<p className="text-sm font-medium">AI Debug</p>

				<Button size="sm" onClick={handleAnalyze} disabled={loading}>
					{loading ? 'Analyzing…' : 'Analyze'}
				</Button>
			</div>

			{errorMessage && (
				<div className="rounded-md border border-destructive/30 bg-destructive/10 p-2">
					<p className="text-xs text-destructive">{errorMessage}</p>
				</div>
			)}

			{!errorMessage && !result && (
				<p className="text-xs text-muted-foreground">Press Analyze to see result</p>
			)}

			{result && (
				<div className="text-xs space-y-2">
					<div>
						<span className="font-medium">Tags:</span> {result.tags.join(', ')}
					</div>

					<div>
						<span className="font-medium">isAlice:</span> {result.isAlice ? 'true' : 'false'} ·{' '}
						<span className="text-muted-foreground">confidence:</span> {result.confidence.alice}
					</div>

					<div>
						<span className="font-medium">
							isBlindCat: {result.isBlindCat ? 'true' : 'false'} ·{' '}
						</span>
						<span className="text-muted-foreground">confidence:</span> {result.confidence.blindcat}
					</div>

					<div className="pt-1 text-muted-foreground">
						<span className="font-medium text-foreground">rationale:</span> {result.rationale}
					</div>
				</div>
			)}
		</div>
	)
}

export default AiDebugPanel
