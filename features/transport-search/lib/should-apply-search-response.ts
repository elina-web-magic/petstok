import type { ShouldApplySearchResponseParams } from '../types'

export const shouldApplySearchResponse = ({
	responseRequestId,
	latestRequestId,
}: ShouldApplySearchResponseParams): boolean => {
	return responseRequestId === latestRequestId
}
