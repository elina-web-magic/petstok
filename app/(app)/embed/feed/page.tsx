import type { CSSProperties } from 'react'
import DevUploadPage from '@/app/dev/ai/page'
import { getOptionalStringParam, getStringParam } from '@/server/http/searchParams'
import { isVideoUrl } from '@/server/video/video.validation'
import { type EmbedTheme, themeVarsByMode } from './styles'

export type EmbedSearchParams = {
	userId?: string
	video?: string
	theme?: string
}

export type ValidationgErrors = {
	videoError?: boolean
	userIdError?: boolean
	themeError?: boolean
}

type EmbedFeedPageProps = {
	searchParams: Promise<EmbedSearchParams>
}

const getTheme = (value: string | undefined): EmbedTheme | 'auto' => {
	if (value === 'dark') return 'dark'
	if (value === 'light') return 'light'
	return 'auto'
}

const EmbedFeedPage = async ({ searchParams }: EmbedFeedPageProps) => {
	const params = (await searchParams) ?? {}

	const videoParam = getStringParam(params.video)
	const userId = getStringParam(params.userId)
	const theme = getTheme(getOptionalStringParam(params.theme))

	const styleVars =
		theme === 'auto' ? undefined : (themeVarsByMode[theme] as unknown as CSSProperties)

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
		<div
			style={styleVars}
			className="EmbedFeedPageWrapper min-h-dvh bg-[var(--ps-bg)] text-[var(--ps-fg)]"
		>
			<div className="mx-auto w-full max-w-[550px] px-4 py-6">
				<div className="rounded-xl bg-[var(--ps-card)] p-4 shadow-sm">
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">Embedded preview</p>
						<h1 className="text-lg font-semibold">Petstok</h1>
						<p className="text-sm text-muted-foreground">
							User: <span className="font-medium text-foreground">{userId || '—'}</span> · Video:{' '}
							<span className="font-medium text-foreground">{videoParam}</span> · Theme:{' '}
							<span className="font-medium text-foreground">{theme}</span>
						</p>
					</div>
				</div>
				<DevUploadPage searchParams={validatedParams} errors={validatingErrors} />
			</div>
		</div>
	)
}

export default EmbedFeedPage
