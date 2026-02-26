import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Button } from '@/components/ui/button'
import { type EmbedTheme, themeVarsByMode } from './styles'

type EmbedSearchParams = {
	userId?: string
	video?: string
	theme?: string
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

	const videoId = typeof params.video === 'string' ? params.video : 'demo'
	const userId = typeof params.userId === 'string' ? params.userId : ''
	const theme = getTheme(typeof params.theme === 'string' ? params.theme : undefined)

	const styleVars =
		theme === 'auto' ? undefined : (themeVarsByMode[theme] as unknown as CSSProperties)

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
							<span className="font-medium text-foreground">{videoId}</span> · Theme:{' '}
							<span className="font-medium text-foreground">{theme}</span>
						</p>
					</div>

					<div className="mt-4 space-y-3">
						<div className="aspect-[9/16] w-full overflow-hidden rounded-lg bg-[var(--ps-muted)]">
							<div className="flex h-full w-full items-center justify-center">
								<p className="text-sm text-muted-foreground">Video placeholder</p>
							</div>
						</div>

						<Button
							asChild
							className="w-full border border-[var(--ps-border)] bg-[var(--ps-primary)] text-[var(--ps-primary-fg)]"
						>
							<Link href="/">Open in Petstok</Link>
						</Button>
					</div>

					<div className="mt-4 border-t pt-3">
						<p className="text-xs text-muted-foreground">
							Tip: try{' '}
							<span className="font-medium">/embed/feed?userId=1&amp;video=123&amp;theme=auto</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmbedFeedPage
