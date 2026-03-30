import { createRequestId } from '../lib/create-request-id'
import { shouldApplySearchResponse } from '../lib/should-apply-search-response'

let currentAbortController: AbortController | null = null
let latestRequestId: string | null = null
type SearchFn<TParams, TResult> = (params: TParams, signal?: AbortSignal) => Promise<TResult>

export const createSearchController = <TParams, TResult>() => {
	const executeSearch = async (
		params: TParams,
		searchFn: SearchFn<TParams, TResult>
	): Promise<TResult | null> => {
		const requestId = createRequestId()
		latestRequestId = requestId

		if (currentAbortController) {
			currentAbortController.abort()
		}

		const controller = new AbortController()
		currentAbortController = controller

		const result = await searchFn(params, controller.signal)

		if (controller.signal.aborted) {
			return null
		}

		const shouldApply = shouldApplySearchResponse({
			responseRequestId: requestId,
			latestRequestId,
		})

		if (!shouldApply) {
			return null
		}

		return result
	}

	return {
		executeSearch,
	}
}
