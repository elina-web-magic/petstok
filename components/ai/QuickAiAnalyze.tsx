'use client'

import { InfoIcon } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Field, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Preview } from '../video/Preview'

interface QuickAiAnalyzeProps {
	onVideoURLInputChange: (e: ChangeEvent<HTMLInputElement>) => void
	onImageReferenceChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
	videoUrl: string
	onVideoError?: () => void
	videoError: boolean
	referenceUrlsText: string
	loading: boolean
}

export default function QuickAiAnalyze(props: QuickAiAnalyzeProps) {
	const {
		onVideoURLInputChange,
		onImageReferenceChange,
		videoUrl,
		onVideoError,
		videoError,
		referenceUrlsText,
	} = props
	return (
		<div className="QuickAiAnalyze">
			{/* ADD VIDEO URL */}
			<Field className="space-y-1">
				<FieldLabel htmlFor="videoUrlInput">Video URL</FieldLabel>
				<Input
					id="videoUrlInput"
					type="text"
					placeholder="https://res.cloudinary.com/.../video/upload/...mp4"
					className="w-full rounded-md border px-3 py-2 text-sm"
					value={videoUrl}
					onChange={onVideoURLInputChange}
				/>
			</Field>

			{/* VIDEO PREVIEW */}
			{!videoError && videoUrl.length > 0 ? (
				<div className="mt-3 space-y-2 h-64 relative">
					<Preview
						className="overflow-hidden rounded-lg h-full flex content-center items-center justify-center bg-[var(--ps-muted)]"
						videoUrl={videoUrl}
						onError={onVideoError}
						muted
						controls
						preload="metadata"
						playsInline
					/>
				</div>
			) : (
				<div className="grid w-full max-w-md items-start gap-4">
					<Alert>
						<InfoIcon />
						<AlertTitle>Cannot upload video. Check URL (mp4)</AlertTitle>
						<AlertDescription>Tip: https://res.cloudinary.com/.../.mp4</AlertDescription>
					</Alert>
				</div>
			)}

			{/* ADD IMAGES REFERENCES */}
			<Field className="space-y-1">
				<FieldLabel htmlFor="videoReferenceTextArea">Pet reference images (optional)</FieldLabel>
				<p className="text-xs text-muted-foreground">One URL per line</p>
				<Textarea
					id="videoReferenceTextArea"
					value={referenceUrlsText}
					onChange={onImageReferenceChange}
					placeholder="https://res.cloudinary.com/.../image/upload/alisa-1.jpg"
					className="min-h-[96px] w-full rounded-md border px-3 py-2 text-sm"
				/>
			</Field>
		</div>
	)
}
