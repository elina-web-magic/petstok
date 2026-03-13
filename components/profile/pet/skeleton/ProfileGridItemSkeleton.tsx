import { AspectRatio } from '@/components/ui/aspect-ratio'

export const ProfileGridItemSkeleton = () => {
	return (
		<div className="ProfileGridItemSkeleton flex animate-pulse flex-col gap-2">
			<AspectRatio className="w-full overflow-hidden rounded-md bg-muted" ratio={9 / 16} />

			<div className="flex flex-col gap-2">
				<div className="h-4 w-full rounded bg-muted" />
				<div className="h-4 w-3/4 rounded bg-muted" />
				<div className="h-3 w-1/3 rounded bg-muted" />
			</div>
		</div>
	)
}
