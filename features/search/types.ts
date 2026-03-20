export type SearchFilters = {
	query: string
	petType?: string
	duration?: string
}

export type SearchPostItem = {
	id: string
	title: string
	videoUrl: string
	petId: string
}

export type SearchResponse = {
	items: SearchPostItem[]
	total: number
}

export type SearchState = 'idle' | 'loading' | 'success' | 'error'
