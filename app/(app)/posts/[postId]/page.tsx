type PostPageProps = {
	params: Promise<{
		postId: string
	}>
}

const PostPage = async ({ params }: PostPageProps) => {
	const { postId } = await params

	return (
		<div className="mx-auto w-full max-w-[550px] px-4 py-6">
			<h1 className="text-lg font-semibold">Post page</h1>
			<p className="text-sm text-muted-foreground">Post ID: {postId}</p>
		</div>
	)
}

export default PostPage
