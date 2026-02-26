import Link from 'next/link'
import type { CSSProperties } from 'react'
import EmbedResizeBridge from '@/components/embed/EmbedResizeBridge'
import { getSafeTargetOrigin } from '@/components/embed/getSafeTargetOrigin'
import HostMessageDebug from '@/components/embed/HostMessageDebug'
import { Button } from '@/components/ui/button'
import { luma } from '@/lib/colors'
import { type Brand, brandStyles, brandVarsByBrandAndMode, themeVarsByMode } from './styles'

type EmbedSearchParams = {
	channelId: string
	video?: string
	brand?: string
	origin?: string
	theme?: string
}

type EmbedFeedPageProps = {
	searchParams: Promise<EmbedSearchParams>
}

const EmbedFeedPage = async ({ searchParams }: EmbedFeedPageProps) => {
	const params = (await searchParams) ?? {}
	const videoId = typeof params?.video === 'string' ? params.video : 'demo'
	const brand = typeof params?.brand === 'string' ? params.brand : 'petstok'
	const originParam = typeof params.origin === 'string' ? params.origin : ''
	const handshakeId = typeof params.channelId === 'string' ? params.channelId : ''
	const safeOrigin = getSafeTargetOrigin(originParam)

	const safeBrand: Brand = brand in brandStyles ? (brand as Brand) : 'petstok'
	const mode = params.theme === 'dark' ? 'dark' : 'light'
	const themeVars = themeVarsByMode[mode]
	const brandVars = brandVarsByBrandAndMode[safeBrand][mode]
	const primary = brandVars['--ps-primary']
	const computedPrimaryFg = primary.startsWith('#')
		? luma(primary) === 'black'
			? '#000000'
			: '#ffffff'
		: undefined

	const styleVars = {
		...themeVars,
		...brandVars,
		...(computedPrimaryFg && { '--ps-primary-fg': computedPrimaryFg }),
	} as CSSProperties

	return (
		<div
			style={styleVars}
			className="EmbedFeedPageWrapper min-h-dvh bg-[var(--ps-bg)] text-[var(--ps-fg)] scheme-dark"
		>
			<div className="mx-auto w-full max-w-[550px] px-4 py-6">
				<div className={`rounded-xl p-4 shadow-sm bg-[var(--ps-card)]`}>
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">Embedded preview</p>
						<h1 className="text-lg font-semibold">Petstok — Featured Pets</h1>
						<p className="text-sm text-muted-foreground">
							Brand: <span className="font-medium text-foreground">{brand}</span> · Video:{' '}
							<span className="font-medium text-foreground">{videoId}</span>
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
							className="EmbedFeedPage-Button w-full bg-[var(--ps-primary)] text-[var(--ps-primary-fg)] border border-[var(--ps-border)]"
						>
							<Link href="/">Open in Petstok</Link>
						</Button>
					</div>
					<EmbedResizeBridge targetOrigin={safeOrigin} channelId={handshakeId} />
					<HostMessageDebug expectedChannelId={handshakeId} />

					<div className="mt-4 border-t pt-3">
						<p className="text-xs text-muted-foreground">
							Tip: try <span className="font-medium">/embed/feed?brand=zalando&amp;video=123</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmbedFeedPage
