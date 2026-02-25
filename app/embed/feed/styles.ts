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

export const themeVarsByMode = {
	light: {
		'--ps-bg': '#ffffff',
		'--ps-fg': '#0a0a0a',
		'--ps-card': '#ffffff',
		'--ps-muted': '#f4f4f5',
	},
	dark: {
		'--ps-bg': '#0a0a0a',
		'--ps-fg': '#fafafa',
		'--ps-card': '#111112',
		'--ps-muted': '#1f1f22',
	},
} as const

export const brandVarsByBrandAndMode = {
	petstok: {
		light: {
			'--ps-primary': '#2563eb',
			'--ps-primary-fg': '#ffffff',
			'--ps-border': 'rgba(0,0,0,0.12)',
		},
		dark: {
			'--ps-primary': '#3b82f6',
			'--ps-primary-fg': '#ffffff',
			'--ps-border': 'rgba(255,255,255,0.16)',
		},
	},

	zalando: {
		light: {
			'--ps-primary': '#000000',
			'--ps-primary-fg': '#ffffff',
			'--ps-border': 'rgba(0,0,0,0.16)',
		},
		dark: {
			'--ps-primary': '#ffffff',
			'--ps-primary-fg': '#000000',
			'--ps-border': 'rgba(255,255,255,0.24)',
		},
	},

	nike: {
		light: {
			'--ps-primary': '#111111',
			'--ps-primary-fg': '#ffffff',
			'--ps-border': 'rgba(0,0,0,0.20)',
		},
		dark: {
			'--ps-primary': '#ffffff',
			'--ps-primary-fg': '#000000',
			'--ps-border': 'rgba(255,255,255,0.24)',
		},
	},
} as const
