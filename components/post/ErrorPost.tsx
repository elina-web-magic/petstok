'use client'

interface ErrorPostProps {
	errorMessagePublish: string
}

export default function ErrorPost(props: ErrorPostProps) {
	const { errorMessagePublish } = props

	return (
		<div className="rounded-md border border-destructive/30 bg-destructive/10 p-2">
			<p className="text-xs text-destructive">{errorMessagePublish}</p>
		</div>
	)
}
