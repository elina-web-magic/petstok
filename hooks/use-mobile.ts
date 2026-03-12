import * as React from 'react'
import { useCallback, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

	const onChange = useCallback(() => {
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
	}, [])

	useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

		mql.addEventListener('change', onChange)

		return () => mql.removeEventListener('change', onChange)
	}, [onChange])

	return !!isMobile
}
