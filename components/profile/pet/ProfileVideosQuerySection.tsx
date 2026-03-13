'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getProfileVideos } from '@/features/profile/pet/api/getProfileVideos'
import { ProfileVideosSection } from './ProfileVideosSection'
import type { ProfileVideoItem, ProfileVideosStatus } from './types'

type ProfileVideosQuerySectionProps = {
	petId: number
}

export const ProfileVideosQuerySection = ({ petId }: ProfileVideosQuerySectionProps) => {
	const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['profileVideos', petId],
		initialPageParam: null as number | null,
		queryFn: ({ pageParam }: { pageParam: number | null }) =>
			getProfileVideos({
				petId,
				cursor: pageParam,
			}),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	})

	const items: ProfileVideoItem[] = data?.pages.flatMap((page) => page.items) ?? []

	return (
		<div className="flex flex-col gap-4">
			<ProfileVideosSection items={items} status={status} />

			{isFetchingNextPage ? (
				<p className="text-center text-sm text-muted-foreground">Loading more videos...</p>
			) : null}

			{hasNextPage ? null : null}
		</div>
	)
}
