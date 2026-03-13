'use client'

import type { RefObject } from 'react'

type InfiniteScrollSentinelProps = {
	sentinelRef: RefObject<HTMLDivElement | null>
	className?: string
}

export const InfiniteScrollSentinel = (props: InfiniteScrollSentinelProps) => {
	const { sentinelRef, className } = props

	if (!sentinelRef) return null

	return <div className={className} ref={sentinelRef}></div>
}
