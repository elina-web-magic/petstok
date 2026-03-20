export type SearchViewState = 'idle' | 'loading' | 'results' | 'empty' | 'error'

export const getSearchViewState = ({
	isLoading,
	isError,
	hasItems,
}: {
	isLoading: boolean
	isError: boolean
	hasItems: boolean
}): SearchViewState => {
	if (isLoading) {
		return 'loading'
	}

	if (isError) {
		return 'error'
	}

	if (hasItems) {
		return 'results'
	}

	return 'empty'
}
