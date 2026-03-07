type UnknownRecord = Record<string, unknown>

export const isRecord = (value: unknown): value is UnknownRecord =>
	typeof value === 'object' && value !== null

export const isNonEmptyString = (value: unknown): value is string =>
	typeof value === 'string' && value.trim().length > 0

export const isStringArray = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every((v) => typeof v === 'string')

export const isPositiveNumber = (value: unknown): value is number =>
	typeof value === 'number' && value > 0

export const isOptionalString = (value: unknown): value is string | undefined =>
	value === undefined || typeof value === 'string'
