import type { SearchParams, ValidationgErrors } from '@/app/(app)/create/page'
import VideoUrlUploadPanel from '@/components/dev/VideoUrlUploadPanel'

type DevUploadPageProps = {
	searchParams: SearchParams
	errors?: ValidationgErrors
}

const DevUploadPage = async ({ searchParams, errors }: DevUploadPageProps) => {
	const initialVideoUrl = typeof searchParams.video === 'string' ? searchParams.video : ''

	return (
		<div className="mx-auto w-full max-w-[550px] px-4 py-6 space-y-4">
			<h1 className="text-lg font-semibold">URL Upload + AI Analyze</h1>
			<VideoUrlUploadPanel
				initialVideoUrl={initialVideoUrl}
				initialVideoError={errors?.videoError}
			/>
		</div>
	)
}

export default DevUploadPage
