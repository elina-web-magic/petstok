import { AnalyzePostButton } from '@/components/ai/AnalyzePostButton'

type DevAiPageProps = {
	searchParams: Promise<{ postId?: string }>
}

const DevAiPage = async ({ searchParams }: DevAiPageProps) => {
	const params = await searchParams
	const rawPostId = params.postId

	if (!rawPostId) {
		return (
			<div className="mx-auto w-full max-w-[550px] px-4 py-6">
				<p>Provide ?postId=123</p>
			</div>
		)
	}

	const numberPostId = Number(rawPostId)

	if (Number.isNaN(numberPostId) || numberPostId <= 0) {
		return (
			<div className="mx-auto w-full max-w-[550px] px-4 py-6">
				<p>Invalid postId</p>
			</div>
		)
	}

	return (
		<div className="mx-auto w-full max-w-[550px] px-4 py-6">
			<AnalyzePostButton postId={numberPostId} />
		</div>
	)
}

export default DevAiPage
