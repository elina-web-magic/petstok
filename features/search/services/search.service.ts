import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'
import type { SearchFilters, SearchResponse } from '../types'

const buildSearchParams = (filters: SearchFilters): URLSearchParams => {
	const params = new URLSearchParams()

	if (filters.query) params.set('query', filters.query)
	if (filters.petType) params.set('petType', filters.petType)
	if (filters.duration) params.set('duration', filters.duration)

	return params
}

export const searchPosts = async (
	filters: SearchFilters,
	signal?: AbortSignal
): Promise<SearchResponse> => {
	const params = buildSearchParams(filters)
	const url = `${API_ENDPOINTS.posts.search}?${params.toString()}`

	return apiClient<SearchResponse>(url, { signal })
}
