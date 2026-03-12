import DevUploadPage from '@/app/dev/ai/page'
import { getStringParam } from '@/server/http/searchParams'
import { isVideoUrl } from '@/server/video/video.validation'

export type SearchParams = {
	userId?: string
	video?: string
	theme?: string
}

export type ValidationgErrors = {
	videoError?: boolean
	userIdError?: boolean
	themeError?: boolean
}

type CreatePostProps = {
	searchParams: Promise<SearchParams>
}

export default async function CreatePostPage({ searchParams }: CreatePostProps) {
	const params = (await searchParams) ?? {}

	const videoParam = getStringParam(params.video)

	const initialVideoUrl = videoParam
	const initialVideoError = !isVideoUrl(videoParam)

	const validatedParams = {
		...params,
		video: initialVideoUrl,
	}

	const validatingErrors = {
		videoError: initialVideoError,
	}
	return (
		<div className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
			<h1 className="text-2xl font-bold tracking-tight mb-6">Create Post</h1>
			<DevUploadPage searchParams={validatedParams} errors={validatingErrors} />
		</div>
	)
}
