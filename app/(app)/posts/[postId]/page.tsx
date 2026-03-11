import SuccessPost from '@/components/post/SuccessPost'
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

	return (
		<div className="mx-auto w-full max-w-[550px] px-4 py-6">
			<SuccessPost result={data} />
		</div>
	)
}

export default PostPage
