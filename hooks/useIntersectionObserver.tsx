'use client'

import { type RefObject, useEffect, useRef } from 'react'

type UseIntersectionObserverProps = {
	target: RefObject<HTMLDivElement | null>
	root?: RefObject<HTMLDivElement | null>
	disabled: boolean
	callback: () => void
	rootMargin?: string
	threshold?: number | number[]
}

export const useIntersectionObserver = ({
	target,
	root,
	disabled,
	callback,
	rootMargin = '200px',
	threshold = 0,
}: UseIntersectionObserverProps) => {
	const callbackRef = useRef(callback)
	const hasTriggeredRef = useRef(false)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		const currentTarget = target.current

		if (!currentTarget) return

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0]

				if (!entry) return

				if (!entry.isIntersecting) {
					hasTriggeredRef.current = false
					return
				}

				if (disabled) return
				if (hasTriggeredRef.current) return

				hasTriggeredRef.current = true
				callbackRef.current()
			},
			{
				root: root?.current ?? null,
				rootMargin,
				threshold,
			}
		)

		observer.observe(currentTarget)

		return () => {
			observer.disconnect()
		}
	}, [target, root, disabled, rootMargin, threshold])
}
