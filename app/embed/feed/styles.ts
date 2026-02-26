export type EmbedTheme = 'light' | 'dark'

export const themeVarsByMode = {
	light: {
		'--ps-bg': '#ffffff',
		'--ps-fg': '#0a0a0a',
		'--ps-card': '#ffffff',
		'--ps-muted': '#f4f4f5',
		'--ps-primary': '#2563eb',
		'--ps-primary-fg': '#ffffff',
		'--ps-border': 'rgba(0,0,0,0.12)',
	},
	dark: {
		'--ps-bg': '#0a0a0a',
		'--ps-fg': '#fafafa',
		'--ps-card': '#111112',
		'--ps-muted': '#1f1f22',
		'--ps-primary': '#3b82f6',
		'--ps-primary-fg': '#ffffff',
		'--ps-border': 'rgba(255,255,255,0.16)',
	},
} as const
