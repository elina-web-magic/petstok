export const API_ENDPOINTS = {
	posts: {
		list: '/api/posts',
		byId: (postId: string) => `/api/posts/${postId}`,
		search: '/api/posts/search',
	},
} as const
