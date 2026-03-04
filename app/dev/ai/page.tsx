import type { EmbedSearchParams } from '@/app/embed/feed/page'
import VideoUrlUploadPanel from '@/components/dev/VideoUrlUploadPanel'

type DevUploadPageProps = {
	searchParams: EmbedSearchParams
}

const DevUploadPage = async (_props: DevUploadPageProps) => {
	return (
		<div className="mx-auto w-full max-w-[550px] px-4 py-6 space-y-4">
			<h1 className="text-lg font-semibold">Dev: URL Upload + AI Analyze</h1>
			<VideoUrlUploadPanel />
		</div>
	)
}

export default DevUploadPage
