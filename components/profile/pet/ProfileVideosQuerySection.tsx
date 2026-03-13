'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { InfiniteScrollSentinel } from '@/components/custom-ui/InfiniteScrollSentinel'
import { getProfileVideos } from '@/features/profile/pet/api/getProfileVideos'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { ProfileVideosSection } from './ProfileVideosSection'
import type { ProfileVideoItem } from './types'

type ProfileVideosQuerySectionProps = {
	petId: number
}

export const ProfileVideosQuerySection = ({ petId }: ProfileVideosQuerySectionProps) => {
	const sentinelRef = useRef<HTMLDivElement | null>(null)

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

	useIntersectionObserver({
		target: sentinelRef,
		disabled: status === 'pending' || isFetchingNextPage || !hasNextPage,
		callback: () => void fetchNextPage(),
		rootMargin: '200px',
	})

	return (
		<div className="flex flex-col gap-4 ProfileVideosQuerySection">
			<ProfileVideosSection items={items} status={status} />
			{hasNextPage && <InfiniteScrollSentinel sentinelRef={sentinelRef} />}
			{isFetchingNextPage ? (
				<p className="text-center text-sm text-muted-foreground">Loading more videos...</p>
			) : null}
		</div>
	)
}
