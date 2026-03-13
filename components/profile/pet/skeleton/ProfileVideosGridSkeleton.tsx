import { ProfileGridItemSkeleton } from './ProfileGridItemSkeleton'

const SKELETON_ITEMS = Array.from({ length: 6 }, (_, i) => `skeleton-${i}`)

export const ProfileVideosGridSkeleton = () => {
	return (
		<div className="grid grid-cols-2 gap-3">
			{SKELETON_ITEMS.map((item) => (
				<ProfileGridItemSkeleton key={item} />
			))}
		</div>
	)
}
