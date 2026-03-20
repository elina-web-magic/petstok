import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'
import type { SearchFilters, SearchResponse } from '../types'

const buildSearchParams = (filters: SearchFilters): URLSearchParams => {
	const params = new URLSearchParams()

	// TODO: map filters to query params

	return params
}

export const searchPosts = async (
	filters: SearchFilters,
	signal?: AbortSignal
): Promise<SearchResponse> => {
	const params = buildSearchParams(filters)
	const url = `${API_ENDPOINTS.posts.search}?${params.toString()}`

	// TODO: call apiClient and return typed response
	return apiClient<SearchResponse>(url, { signal })
}
