'use client'

import { useRouter } from 'next/navigation'
import { type ChangeEvent, type MouseEvent, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import type { QuickVideoAiResult } from '@/server/ai/types'
import type { CreatePostResponse } from '@/server/posts/types'
import QuickAiAnalyze from '../ai/QuickAiAnalyze'
import ErrorPost from '../post/ErrorPost'
import SuccessPost from '../post/SuccessPost'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Textarea } from '../ui/textarea'

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
	const [publishLoading, setPublishLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [errorMessagePublish, setErrorMessagePublish] = useState<string | null>(null)
	const [result, setResult] = useState<QuickVideoAiResult | null>(null)
	const [videoError, setVideoError] = useState(initialVideoError ?? false)
	const [showDetails, setShowDetails] = useState(false)
	const [description, setDescription] = useState('')

	const router = useRouter()

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

			const data = (await response.json()) as QuickVideoAiResult
			setResult(data)
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			setErrorMessage(message)
			setResult(null)
		} finally {
			setLoading(false)
		}
	}

	const handlePublishPost = async () => {
		setPublishLoading(true)
		setErrorMessagePublish(null)

		try {
			const response = await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					videoUrl,
					caption: description,
					petId: 1,
				}),
			})

			if (!response.ok) {
				const text = await response.text()
				throw new Error(`Cannot publish post ${response.status} ${text}`)
			}

			const data = (await response.json()) as CreatePostResponse
			router.push(`/posts/${data.post.id}`)
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			setErrorMessagePublish(message)
		} finally {
			setPublishLoading(false)
		}
	}

	const handlePrePublish = (e: MouseEvent<HTMLButtonElement>) => {
		if (!description.trim()) {
			e.preventDefault()
			setErrorMessagePublish('Please, add description')
		} else {
			setErrorMessagePublish(null)
		}
	}

	const handleVideoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		setVideoUrl(e.target.value)
		setVideoError(false)
	}

	useEffect(() => {
		setVideoError(initialVideoError ?? false)
	}, [initialVideoError])

	return (
		<div className="rounded-xl border border-[var(--ps-border)] bg-[var(--ps-card)] p-4 space-y-3">
			{/* QUICK VIDEO ANALYZE */}
			<QuickAiAnalyze
				onVideoURLInputChange={handleVideoUrlChange}
				onImageReferenceChange={(e) => setReferenceUrlsText(e.target.value)}
				videoUrl={videoUrl}
				onVideoError={() => setVideoError(true)}
				videoError={videoError}
				referenceUrlsText={referenceUrlsText}
				loading={loading}
			/>

			{/* QUICK VIDEO ANALYZE BUTTON */}
			<Button
				className="w-full"
				variant="secondary"
				onClick={handleDevAnalyzeFlow}
				disabled={loading || !videoUrl.trim() || videoError}
			>
				{loading ? 'Analyzing…' : 'Analyze with Vision'}
			</Button>

			{/* QUICK VIDEO ANALYZE ERRORS */}
			{!errorMessage && !result && (
				<p className="text-xs text-muted-foreground">Press Analyze to see result</p>
			)}
			{errorMessage && (
				<div className="rounded-md border border-destructive/30 bg-destructive/10 p-2">
					<p className="text-xs text-destructive">{errorMessage}</p>
				</div>
			)}

			{/* DESCRIPTION */}
			<Field className="space-y-1">
				<FieldLabel htmlFor="captionTextArea">Description</FieldLabel>
				<Textarea
					id="captionTextArea"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Write a short description for the post"
					className="min-h-[96px] w-full rounded-md border px-3 py-2 text-sm"
				/>
			</Field>

			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						type="button"
						size="sm"
						className="w-full"
						disabled={!videoUrl.trim() || videoError || publishLoading}
						onClick={handlePrePublish}
					>
						Publish
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure you want to publish a post?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handlePublishPost}>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{errorMessagePublish && <ErrorPost errorMessagePublish={errorMessagePublish} />}
			{result && (
				<SuccessPost
					result={result}
					videoUrl={videoUrl}
					onError={() => setVideoError(true)}
					openDetails={() => setShowDetails((v) => !v)}
					showDetails={showDetails}
				/>
			)}
		</div>
	)
}

export default VideoUrlUploadPanel
