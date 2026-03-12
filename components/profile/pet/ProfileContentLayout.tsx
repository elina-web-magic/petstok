import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ProfileContentLayout = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4">
				<Card className="w-full border-border/60 shadow-sm">
					<CardHeader>
						<CardTitle>Videos</CardTitle>
					</CardHeader>

					<CardContent>
						<div className="flex min-h-[220px] items-center justify-center rounded-md border border-dashed border-border/70 px-4 py-10 text-center">
							<p className="text-sm text-muted-foreground">
								Videos grid will be added in the next ticket.
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="w-full border-border/60 shadow-sm">
					<CardHeader>
						<CardTitle>Side Panel</CardTitle>
					</CardHeader>

					<CardContent>
						<div className="rounded-md border border-dashed border-border/70 px-4 py-6">
							<p className="text-sm text-muted-foreground">
								Placeholder for future profile tools and recommendations.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default ProfileContentLayout
