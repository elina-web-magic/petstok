'use client'

import { useState } from 'react'
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

const VideoUrlUploadPanel = () => {
	const [videoUrl, setVideoUrl] = useState('')
	const [referenceUrlsText, setReferenceUrlsText] = useState('')
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [result, setResult] = useState<AiResult | null>(null)
	const [videoError, setVideoError] = useState(false)
	const [showDetails, setShowDetails] = useState(false)

	const handleAnalyze = async () => {
		setLoading(true)
		setErrorMessage(null)
		setResult(null)
		setShowDetails(false)

		try {
			const animalReferenceImageUrls = referenceUrlsText
				.split('\n')
				.map((s) => s.trim())
				.filter((s) => s.length > 0)

			const res = await fetch('/api/ai/pet-tags', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ videoUrl, animalReferenceImageUrls }),
			})

			if (!res.ok) {
				const text = await res.text()
				throw new Error(`AI route failed: ${text} ${res.status}`)
			}

			const data = (await res.json()) as AiResult
			setResult(data)
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			setErrorMessage(message)
			setResult(null)
		} finally {
			setLoading(false)
		}
	}

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
			</Field>

			{videoUrl.trim().length > 0 && (
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

					{videoError && (
						<p className="text-xs text-destructive">Cannot upload video. Check URL (mp4).</p>
					)}

					<p className="text-xs text-muted-foreground">Tip: Please, use mp4 format</p>
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
				onClick={handleAnalyze}
				disabled={loading || videoUrl.trim().length === 0}
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
					<div className="text-muted-foreground">
						<span className="font-medium text-foreground">Animal confidence:</span>{' '}
						{result.confidence.animal}
					</div>
					{result.isBlind && (
						<div>
							<div className="flex items-center justify-between">
								{result.confidence.blind && (
									<div className="text-muted-foreground">
										<span className="font-medium text-foreground">Blind confidence:</span>{' '}
										{result.confidence.blind}
									</div>
								)}
							</div>
						</div>
					)}

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

					<div className="pt-1 text-muted-foreground">
						<span className="font-medium text-foreground">Rationale:</span> {result.rationale}
					</div>
				</div>
			)}
		</div>
	)
}

export default VideoUrlUploadPanel
