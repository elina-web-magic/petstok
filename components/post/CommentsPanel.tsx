'use client'

import { type ComponentProps, useState } from 'react'
import { DEFAULT_HEADERS } from '@/globalConstants'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

type Comment = {
	id: string
	authorName: string
	message: string
	createdAt: string
	isOptimistic?: boolean
}

type CommentsPanelProps = {
	postId: number
	initialComments?: Comment[]
}

const CommentsPanel = (props: CommentsPanelProps) => {
	const { initialComments = [], postId } = props

	const [comments, setComments] = useState<Comment[]>(initialComments)
	const [value, setValue] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [error, setError] = useState<string | null>(null)

	const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (event) => {
		event.preventDefault()

		setError(null)
		if (isSubmitting === true) return

		const trimmedValue = value.trim()
		if (trimmedValue.length === 0) return

		const optimisticComment: Comment = {
			id: crypto.randomUUID(),
			authorName: 'You',
			message: trimmedValue,
			createdAt: Date.now().toFixed(),
			isOptimistic: true,
		}

		setComments((prev) => [optimisticComment, ...prev])
		setValue('')
		setIsSubmitting(true)
		try {
			const response = await fetch(`/api/posts/${postId}/comments`, {
				method: 'POST',
				headers: DEFAULT_HEADERS,
				body: JSON.stringify({
					message: trimmedValue,
				}),
			})

			if (!response.ok) {
				const text = await response.text()
				throw new Error(text || 'Failed to add comment')
			}
			const data = (await response.json()) as Comment

			setComments((prev) =>
				prev.map((comment) =>
					comment.id === optimisticComment.id
						? {
								...data,
								isOptimistic: false,
							}
						: comment
				)
			)
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error'
			setError(message)
			setComments((prev) => prev.filter((comment) => comment.id !== optimisticComment.id))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className="CommentsPanel flex h-full flex-col bg-background">
			<div className="flex-none border-b px-4 py-4">
				<h2 className="text-base font-semibold">Comments</h2>
				<p className="text-sm text-muted-foreground">Join the discussion under this post.</p>
			</div>

			<div className="CommentsSection min-h-0 flex-1 overflow-y-auto px-4 py-4">
				{error ? (
					<div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
						{error}
					</div>
				) : null}

				{comments.length === 0 ? (
					<div className="rounded-xl text-sm text-muted-foreground">No comments yet</div>
				) : (
					<div className="Comments space-y-4">
						{comments.map((comment) => (
							<article key={comment.id} className="rounded-xl border border-black/10 p-3">
								<div className="mb-1 flex items-center justify-between gap-3">
									<p className="text-sm font-medium">{comment.authorName}</p>
									<span className="text-xs text-muted-foreground">{comment.createdAt}</span>
								</div>

								<p className="text-sm leading-6 text-foreground/90">{comment.message}</p>
							</article>
						))}
					</div>
				)}
			</div>

			<div className="CommentsSubmit flex-none border-t px-4 py-4">
				<form className="space-y-3" onSubmit={handleSubmit}>
					<textarea
						className={`${error && 'border-red-600'} min-h-[96px] w-full resize-none rounded-xl border border-orange-800 bg-background px-3 py-2 text-sm outline-none focus:border-orange-500`}
						placeholder="Write a comment..."
						value={value}
						onChange={(event) => setValue(event.target.value)}
					/>

					<div className="flex justify-end">
						<Button
							type="submit"
							variant="secondary"
							size="lg"
							className="rounded-full px-4 py-2 text-sm text-background transition-opacity"
							disabled={!value.trim() || isSubmitting}
						>
							{isSubmitting ? (
								<div className="WaitSpinner flex flex-row items-center justify-center gap-4 no-wrap">
									<span>Please wait</span>
									<Spinner data-icon="inline-start" />
								</div>
							) : (
								'Post comment'
							)}
						</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default CommentsPanel
