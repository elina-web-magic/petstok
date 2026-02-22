export type Brand = keyof typeof brandStyles

export const brandStyles = {
	petstok: {
		frame: 'border bg-card text-foreground',
		button: 'bg-primary text-primary-foreground',
	},
	zalando: {
		frame: 'border border-zinc-800 bg-zinc-950 text-zinc-50',
		button: 'bg-white text-black',
	},
	nike: {
		frame: 'border border-black bg-indigo-500/50 text-black',
		button: 'border bg-white border-indigo-500/50 text-indigo-500',
	},
} as const
