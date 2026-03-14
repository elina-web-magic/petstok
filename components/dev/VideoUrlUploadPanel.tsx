'use client'

import { useRouter } from 'next/navigation'
import { type ChangeEvent, type MouseEvent, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import type { QuickVideoAiResult } from '@/server/ai/types'
import type { CreatePostResponse } from '@/server/posts/types'
import AnalyzeResult from '../ai/AnalyzeResult'
import QuickAiAnalyze from '../ai/QuickAiAnalyze'
import DraftSavedAlert from '../custom-ui/DraftSavedAlert'
import InsertSuggestionButton from '../custom-ui/InsertSuggestionButton'
import ErrorPost from '../post/ErrorPost'
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
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type VideoUrlUploadPanelProps = {
	onProcessingStarted: () => void
	onProcessingReset: () => void
	initialVideoUrl?: string
	initialVideoError?: boolean
}

const VIDEO_UPLOAD_DRAFT_STORAGE_KEY = 'petstok.video-upload.draft'

const VideoUrlUploadPanel = ({
	initialVideoUrl = '',
	initialVideoError,
	onProcessingStarted,
	onProcessingReset,
}: VideoUrlUploadPanelProps) => {
	const [videoUrl, setVideoUrl] = useState(initialVideoUrl)
	const [referenceUrlsText, setReferenceUrlsText] = useState('')
	const [loading, setLoading] = useState(false)
	const [publishLoading, setPublishLoading] = useState(false)

	const [result, setResult] = useState<QuickVideoAiResult | null>()
	const [description, setDescription] = useState<string | undefined>()
	const [showDetails, setShowDetails] = useState(false)
	const [title, setTitle] = useState<string>('')

	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [errorMessagePublish, setErrorMessagePublish] = useState<string | null>(null)
	const [videoError, setVideoError] = useState(initialVideoError ?? false)
	const [visibleAlert, setVisibleAlert] = useState<boolean>(false)
	const [isDirty, setIsDirty] = useState(false)

	const router = useRouter()

	const handleDevAnalyzeFlow = async () => {
		setLoading(true)
		setErrorMessage(null)
		setResult(null)
		setShowDetails(false)
		onProcessingReset()

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
			onProcessingStarted()
			setResult(data)
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			setErrorMessage(message)
			onProcessingReset()
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
					title,
					petId: 1,
				}),
			})

			if (!response.ok) {
				const text = await response.text()
				throw new Error(`Cannot publish post ${response.status} ${text}`)
			}

			const data = (await response.json()) as CreatePostResponse

			localStorage.removeItem(VIDEO_UPLOAD_DRAFT_STORAGE_KEY)
			router.push(`/posts/${data.post.id}`)
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			setErrorMessagePublish(message)
		} finally {
			setPublishLoading(false)
		}
	}

	const handlePrePublish = (e: MouseEvent<HTMLButtonElement>) => {
		if (!title.trim()) {
			e.preventDefault()
			setErrorMessagePublish('Please, add title')
		} else {
			setErrorMessagePublish(null)
		}
	}

	const handleVideoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		setVideoUrl(e.target.value)
		setVideoError(false)
	}

	const handleInsertSuggestion = () => {
		if (!result) return

		const hashtagsLine = result.hashtags.join(' ')
		setTitle(result.title)

		setDescription([result.description, hashtagsLine].filter(Boolean).join('\n\n'))
	}

	useEffect(() => {
		const rawDraft = window.localStorage.getItem(VIDEO_UPLOAD_DRAFT_STORAGE_KEY)

		if (!rawDraft) return

		try {
			const draft = JSON.parse(rawDraft) as {
				videoUrl?: string
				referenceUrlsText?: string
				title?: string
				description?: string
			}

			setVideoUrl(draft.videoUrl ?? initialVideoUrl)
			setReferenceUrlsText(draft.referenceUrlsText ?? '')
			setTitle(draft.title ?? '')
			setDescription(draft.description ?? '')
		} catch {
			window.localStorage.removeItem(VIDEO_UPLOAD_DRAFT_STORAGE_KEY)
		}
	}, [initialVideoUrl])

	const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setIsDirty(true)
		setDescription(e.target.value)
	}

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsDirty(true)
		setTitle(e.target.value)
	}

	useEffect(() => {
		setVideoError(initialVideoError ?? false)
	}, [initialVideoError])

	useEffect(() => {
		if (!isDirty) return

		const saveTimer = setTimeout(() => {
			const draft = {
				videoUrl,
				referenceUrlsText,
				title,
				description,
			}

			localStorage.setItem(VIDEO_UPLOAD_DRAFT_STORAGE_KEY, JSON.stringify(draft))
			setVisibleAlert(true)
			setIsDirty(false)
		}, 3000)

		return () => clearTimeout(saveTimer)
	}, [isDirty, videoUrl, referenceUrlsText, title, description])

	useEffect(() => {
		if (!visibleAlert) return

		const hideTimer = setTimeout(() => {
			setVisibleAlert(false)
		}, 2000)

		return () => clearTimeout(hideTimer)
	}, [visibleAlert])

	return (
		<div className="rounded-xl border border-[var(--ps-border)] bg-[var(--ps-card)] p-4 space-y-3 grid gap-4">
			{visibleAlert && (
				<DraftSavedAlert
					title="Draft saved"
					description="Your changes were saved automatically."
					variant="secondary"
					size="xs"
				/>
			)}
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
			{result && (
				<AnalyzeResult
					result={result}
					videoUrl={videoUrl}
					openDetails={() => setShowDetails((v) => !v)}
					showDetails={showDetails}
					onError={() => setVideoError(true)}
				/>
			)}

			{/* CONTENT */}
			{result && (
				<InsertSuggestionButton
					handleInsertSuggestion={handleInsertSuggestion}
					text="Insert suggested content"
				/>
			)}

			<Field className="space-y-1">
				<div className="flex items-center justify-between gap-2">
					<FieldLabel htmlFor="postTitle">Title</FieldLabel>
				</div>
				<Input
					id="postTitle"
					type="text"
					value={title}
					onChange={handleTitleChange}
					placeholder="Write title"
					className="w-full rounded-md border px-3 py-2 text-sm"
				/>
			</Field>

			<Field className="space-y-1">
				<div className="flex items-center justify-between gap-2">
					<FieldLabel htmlFor="postDescription">Description</FieldLabel>
				</div>

				<Textarea
					value={description}
					onChange={handleDescriptionChange}
					placeholder="Write a short description for the post"
					className="min-h-[96px] w-full rounded-md border px-3 py-2 text-sm"
				/>
			</Field>

			{/* PUBLUSH */}
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
		</div>
	)
}

export default VideoUrlUploadPanel
