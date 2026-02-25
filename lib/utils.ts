import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type color = 'black' | 'white'
type RGB = {
	R: number
	G: number
	B: number
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const hexToRgb = (hex: string): RGB | null => {
	const value = hex.trim().toLowerCase()
	if (!/^#[0-9a-f]{6}$/.test(value)) return null

	const R = parseInt(value.slice(1, 3), 16)
	const G = parseInt(value.slice(3, 5), 16)
	const B = parseInt(value.slice(5, 7), 16)

	return { R, G, B }
}

export const luma = (hex: string): color => {
	const rgb = hexToRgb(hex)
	if (!rgb) return 'white'

	const luma = 0.299 * rgb.R + 0.587 * rgb.G + 0.114 * rgb.B
	return luma > 186 ? 'black' : 'white'
}
