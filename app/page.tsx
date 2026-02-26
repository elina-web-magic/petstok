import Link from 'next/link'
import { Button } from '@/components/ui/button'

const HomePage = () => {
	const sessionId = crypto.randomUUID()
	const userId = '1'
	const href = `/embed/feed?userId=${userId}&video=123&sessionId=${sessionId}`

	return (
		<main className="min-h-dvh bg-background text-foreground">
			<div className="mx-auto w-full max-w-[550px] px-4 py-6">
				<h1 className="text-xl font-semibold">Petstok</h1>

				<div className="mt-6">
					<Link href={href}>
						<Button className="w-full">Open Feed</Button>
					</Link>
				</div>
			</div>
		</main>
	)
}

export default HomePage
