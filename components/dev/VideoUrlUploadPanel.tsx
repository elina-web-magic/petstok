'use client'

import { InfoIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '../ui/textarea'

type AiResult = {
	tags: string[]
	animal: 'cat' | 'dog' | 'unknown'
	isBlind: boolean
	confidence: {
		animal: number
		blind: number
	}
	rationale: string
}

type VideoUrlUploadPanelProps = {
	initialVideoUrl?: string
	initialVideoError?: boolean
}

const VideoUrlUploadPanel = ({
	initialVideoUrl = '',
	initialVideoError,
}: VideoUrlUploadPanelProps) => {
	const [videoUrl, setVideoUrl] = useState(initialVideoUrl)
	const [referenceUrlsText, setReferenceUrlsText] = useState('')
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [result, setResult] = useState<AiResult | null>(null)
	const [videoError, setVideoError] = useState(initialVideoError ?? false)
	const [showDetails, setShowDetails] = useState(false)

	const handleDevAnalyzeFlow = async () => {
		setLoading(true)
		setErrorMessage(null)
		setResult(null)
		setShowDetails(false)

		try {
			const animalReferenceImageUrls = referenceUrlsText
				.split('\n')
				.map((value) => value.trim())
				.filter((value) => value.length > 0)

			const response = await fetch('/api/ai/quick-video-check', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					videoUrl,
					animalReferenceImageUrls,
				}),
			})

			if (!response.ok) {
				const text = await response.text()
				throw new Error(`Quick check failed: ${text} ${response.status}`)
			}

			const data = (await response.json()) as AiResult
			setResult(data)
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			setErrorMessage(message)
			setResult(null)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		setVideoError(initialVideoError ?? false)
	}, [initialVideoError])

	return (
		<div className="rounded-xl border border-[var(--ps-border)] bg-[var(--ps-card)] p-4 space-y-3">
			<Field className="space-y-1">
				<FieldLabel htmlFor="videoUrlInput">Video URL</FieldLabel>
				<Input
					id="videoUrlInput"
					type="text"
					placeholder="https://res.cloudinary.com/.../video/upload/...mp4"
					className="w-full rounded-md border px-3 py-2 text-sm"
					value={videoUrl}
					onChange={(e) => {
						setVideoUrl(e.target.value)
						setVideoError(false)
					}}
				/>
				{/* TODO:input edits do not update URL search params automatically.
				Later we may add a
				"Update URL" button for shareable preview links. */}
			</Field>

			{!videoError && videoUrl.length > 0 ? (
				<div className="mt-3 space-y-2">
					<div className="aspect-[9/16] w-full overflow-hidden rounded-lg bg-[var(--ps-muted)]">
						<video
							className="h-full w-full object-cover"
							src={videoUrl}
							muted
							controls
							playsInline
							preload="metadata"
							onError={() => setVideoError(true)}
						>
							<track kind="captions" />
						</video>
					</div>
				</div>
			) : (
				<div className="grid w-full max-w-md items-start gap-4">
					<Alert>
						<InfoIcon />
						<AlertTitle>Cannot upload video. Check URL (mp4)</AlertTitle>
						<AlertDescription>
							Tip: https://res.cloudinary.com/.../image/upload/alisa-1.jpg
						</AlertDescription>
					</Alert>
				</div>
			)}

			<Field className="space-y-1">
				<FieldLabel htmlFor="videoReferenceTextArea">Pet reference images (optional)</FieldLabel>
				<p className="text-xs text-muted-foreground">One URL per line</p>
				<Textarea
					id="videoReferenceTextArea"
					value={referenceUrlsText}
					onChange={(e) => setReferenceUrlsText(e.target.value)}
					placeholder="https://res.cloudinary.com/.../image/upload/alisa-1.jpg"
					className="min-h-[96px] w-full rounded-md border px-3 py-2 text-sm"
				/>
			</Field>

			<Button
				className="w-full"
				onClick={handleDevAnalyzeFlow}
				disabled={loading || !videoUrl.trim() || videoError}
			>
				{loading ? 'Analyzing…' : 'Analyze with Vision'}
			</Button>

			{!errorMessage && !result && (
				<p className="text-xs text-muted-foreground">Press Analyze to see result</p>
			)}
			{errorMessage && (
				<div className="rounded-md border border-destructive/30 bg-destructive/10 p-2">
					<p className="text-xs text-destructive">{errorMessage}</p>
				</div>
			)}

			{result && (
				<div className="rounded-md border border-[var(--ps-border)] bg-[var(--ps-card)] p-3 text-xs space-y-2">
					<div className="flex items-center justify-between">
						<div>
							<span className="font-medium">Animal:</span>{' '}
							{result.animal === 'cat' && <span>Cat 😺</span>}
							{result.animal === 'dog' && <span>Dog 🐶</span>}
							{result.animal === 'unknown' && <span>Unknown 🥺</span>}
						</div>
					</div>
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="w-full"
						onClick={() => setShowDetails((v) => !v)}
					>
						{showDetails ? 'Hide details' : 'Show details'}
					</Button>

					{showDetails && (
						<div className="rounded-md border border-[var(--ps-border)] bg-[var(--ps-muted)] p-2 space-y-2">
							<div className="flex items-center justify-between">
								<span className="font-medium">Animal confidence:</span>
								<span className="text-muted-foreground">{result.confidence.animal}</span>
							</div>

							{result.isBlind && (
								<div className="flex items-center justify-between">
									<span className="font-medium">Blind confidence:</span>
									<span className="text-muted-foreground">{result.confidence.blind}</span>
								</div>
							)}

							<div className="text-muted-foreground">
								<span className="font-medium text-foreground">Rationale:</span> {result.rationale}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default VideoUrlUploadPanel
