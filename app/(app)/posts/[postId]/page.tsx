import { Preview } from '@/components/video/Preview'
import { getPostById } from '@/server/posts/actions/getPostById'
import { parseId } from '@/server/utils/guards'

type PostPageProps = {
	params: Promise<{
		postId: string
	}>
}

const PostPage = async ({ params }: PostPageProps) => {
	const { postId } = await params

	const id = parseId(postId)

	if (!id) {
		throw new Error('Cannot get post id')
	}

	const data = await getPostById(id)

	if (!data) return <>Post not found</>

	const {
		videoUrl,
		caption,
		petId,
		aiTags,
		aiConfidence,
		aiDescription,
		moderationStatus,
		moderationReason,
	} = data

	return (
		<div className="mx-auto w-full max-w-[550px] px-4 py-6">
			<Preview
				className="w-full overflow-hidden rounded-lg bg-[var(--ps-muted)] mb-10"
				videoUrl={videoUrl}
				aspectRatio={9 / 16}
				muted
				controls
				preload="metadata"
				playsInline
			/>
			<div className="rounded-md border border-[var(--ps-border)] bg-[var(--ps-muted)] p-2 space-y-2">
				<h1 className="text-lg font-semibold">{caption}</h1>
				<p className="text-sm text-muted-foreground">Post ID: {postId}</p>
				<p className="text-sm text-muted-foreground">Pet ID: {petId}</p>
				{moderationStatus ? (
					<p className="text-sm text-muted-foreground">Moderation Status: {moderationStatus}</p>
				) : (
					<></>
				)}
				{moderationReason ? (
					<p className="text-sm text-muted-foreground">Moderation Reason: {moderationReason}</p>
				) : (
					<></>
				)}
				{aiDescription ? (
					<p className="text-sm text-muted-foreground">Description: {aiDescription}</p>
				) : (
					<></>
				)}
				{aiTags?.length ? aiTags.map((tag) => <div key={tag}>#{tag}</div>) : <></>}
				<div className="flex items-center justify-between">
					<span className="font-medium">Animal confidence:</span>
					<span className="text-muted-foreground">{aiConfidence}</span>
				</div>
			</div>
		</div>
	)
}

export default PostPage
