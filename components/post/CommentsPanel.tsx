'use client'

import { type ComponentProps, useState } from 'react'

type Comment = {
	id: string
	authorName: string
	message: string
	createdAt: string
}

type CommentsPanelProps = {
	initialComments?: Comment[]
}

const CommentsPanel = ({ initialComments = [] }: CommentsPanelProps) => {
	const [comments, setComments] = useState<Comment[]>(initialComments)
	const [value, setValue] = useState('')

	const [error, setError] = useState<string | null>(null)

	const handleSubmit: ComponentProps<'form'>['onSubmit'] = (event) => {
		event.preventDefault()

		setError(null)

		try {
			const trimmedValue = value.trim()

			if (trimmedValue.length === 0) return

			const newComment: Comment = {
				id: crypto.randomUUID(),
				authorName: 'You',
				message: trimmedValue,
				createdAt: new Date().toLocaleString(),
			}

			setComments((prev) => [newComment, ...prev])
			setValue('')
		} catch {
			setError('Failed to add comment')
		}
	}

	return (
		<section className="flex h-full flex-col bg-background">
			<div className="border-b px-4 py-4">
				<h2 className="text-base font-semibold">Comments</h2>
				<p className="text-sm text-muted-foreground">Join the discussion under this post.</p>
			</div>

			<div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
				{error ? (
					<div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
						{error}
					</div>
				) : null}

				{comments.length === 0 ? (
					<div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
						No comments yet
					</div>
				) : (
					<div className="space-y-4">
						{comments.map((comment) => (
							<article key={comment.id} className="rounded-xl border p-3">
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

			<div className="border-t px-4 py-4">
				<form className="space-y-3" onSubmit={handleSubmit}>
					<textarea
						className="min-h-[96px] w-full resize-none rounded-xl border bg-background px-3 py-2 text-sm outline-none"
						placeholder="Write a comment..."
						value={value}
						onChange={(event) => setValue(event.target.value)}
					/>

					<div className="flex justify-end">
						<button
							type="submit"
							className="rounded-full bg-foreground px-4 py-2 text-sm text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
							disabled={!value.trim()}
						>
							Post comment
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default CommentsPanel

export type { Comment }
