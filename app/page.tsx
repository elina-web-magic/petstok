import Link from 'next/link'
import { Button } from '@/components/ui/button'

const HomePage = () => {
	const channelId = crypto.randomUUID()
	const href = `/embed/feed?brand=zalando&video=123&channelId=${channelId}`

	return (
		<main className="min-h-dvh bg-background text-foreground">
			<div className="mx-auto w-full max-w-[550px] px-4 py-6">
				<div className="space-y-2">
					<h1 className="text-xl font-semibold">Petstok</h1>
				</div>

				<div className="mt-6 space-y-3">
					<Link href={href} className="block">
						<Button className="w-full" variant="default">
							Open Feed
						</Button>
					</Link>
				</div>
			</div>
		</main>
	)
}

export default HomePage
