import { TARGET_ORIGIN } from '@/components/embed/constants'

export const getSafeTargetOrigin = (originParam: string): string => {
	const raw = originParam.trim()
	if (!raw) return TARGET_ORIGIN

	const allowList = [
		process.env.URL_DEVELOPMENT ?? '',
		process.env.URL_STAGING ?? '',
		process.env.URL_PRODUCTION ?? '',
	].filter(Boolean)

	return allowList.includes(raw) ? raw : TARGET_ORIGIN
}
