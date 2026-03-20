import { Logger } from '../logger/logger'
import { ConsoleSink } from '../logger/sinks'

export type ApiRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type ApiRequestOptions = {
	method?: ApiRequestMethod
	headers?: Record<string, string>
	body?: string
	signal?: AbortSignal
}

export type ApiErrorCode =
	| 'NETWORK_ERROR'
	| 'UNAUTHORIZED'
	| 'FORBIDDEN'
	| 'NOT_FOUND'
	| 'VALIDATION_ERROR'
	| 'SERVER_ERROR'
	| 'UNKNOWN_ERROR'

export type ApiError = {
	code: ApiErrorCode
	message: string
	status?: number
}

export const DEFAULT_HEADERS = {
	'Content-Type': 'application/json',
}

const logger = new Logger({
	scope: 'lib:api:client',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

const normalizeApiError = async (response: Response): Promise<ApiError> => {
	if (response.status === 401) {
		return {
			code: 'UNAUTHORIZED',
			message: 'Unauthorized',
			status: response.status,
		}
	}

	if (response.status === 403) {
		return {
			code: 'FORBIDDEN',
			message: 'Forbidden',
			status: response.status,
		}
	}

	if (response.status === 404) {
		return {
			code: 'NOT_FOUND',
			message: 'Not found',
			status: response.status,
		}
	}

	if (response.status === 422) {
		return {
			code: 'VALIDATION_ERROR',
			message: 'Validation error',
			status: response.status,
		}
	}

	if (response.status >= 500) {
		return {
			code: 'SERVER_ERROR',
			message: 'Server error',
			status: response.status,
		}
	}

	return {
		code: 'UNKNOWN_ERROR',
		message: 'Request failed',
		status: response.status,
	}
}

export const apiClient = async <TResponse>(
	url: string,
	options: ApiRequestOptions = {}
): Promise<TResponse> => {
	const requestOptions: RequestInit = {
		method: options.method ?? 'GET',
		headers: {
			...DEFAULT_HEADERS,
			...options.headers,
		},
		body: options.body,
		signal: options.signal,
	}

	try {
		const response = await fetch(url, requestOptions)
		if (!response.ok) {
			logger.error('Invalid response', { url, status: response.status })
			throw await normalizeApiError(response)
		}

		const body = (await response.json()) as TResponse

		return body
	} catch (error) {
		if (typeof error === 'object' && error !== null && 'code' in error) {
			throw error
		}
		logger.error('Network request failed', { url })

		throw {
			code: 'NETWORK_ERROR',
			message: 'Network request failed',
		} satisfies ApiError
	}
}
