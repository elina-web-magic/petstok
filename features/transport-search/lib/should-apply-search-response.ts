import type { SearchRequestId } from '../types/normalized-transport'

type ShouldApplySearchResponseParams = {
	responseRequestId: SearchRequestId
	latestRequestId: SearchRequestId | null
}

export const shouldApplySearchResponse = ({
	responseRequestId,
	latestRequestId,
}: ShouldApplySearchResponseParams): boolean => {
	return responseRequestId === latestRequestId
}
