'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'
import { InfiniteScrollSentinel } from '@/components/custom-ui/InfiniteScrollSentinel'
import { getProfileVideos } from '@/features/profile/pet/api/getProfileVideos'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { ProfileVideosSection } from './ProfileVideosSection'

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

	const rawItems = data?.pages.flatMap((page) => page.items) ?? []
	const items = Array.from(new Map(rawItems.map((item) => [item.id, item])).values())

	const handleLoadMore = useCallback(() => {
		void fetchNextPage()
	}, [fetchNextPage])

	useIntersectionObserver({
		target: sentinelRef,
		disabled: status === 'pending' || isFetchingNextPage || !hasNextPage,
		callback: () => handleLoadMore(),
		rootMargin: '200px',
	})

	return (
		<div className="flex flex-col gap-4 ProfileVideosQuerySection">
			<ProfileVideosSection items={items} status={status} />
			{hasNextPage && (
				<InfiniteScrollSentinel className="w-ful h10 Sentinel" sentinelRef={sentinelRef} />
			)}
			{isFetchingNextPage ? (
				<p className="text-center text-sm text-muted-foreground">Loading more videos...</p>
			) : null}
		</div>
	)
}
