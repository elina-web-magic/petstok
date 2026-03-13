'use client'

import type { RefObject } from 'react'

type InfiniteScrollSentinelProps = {
	sentinelRef: RefObject<HTMLDivElement | null>
}

export const InfiniteScrollSentinel = (props: InfiniteScrollSentinelProps) => {
	const { sentinelRef } = props

	if (!sentinelRef) return null

	return <div ref={sentinelRef}></div>
}
