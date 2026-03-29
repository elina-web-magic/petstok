import * as fs from 'node:fs'
import * as path from 'node:path'

const ENV_FILES = [
	'.env',
	'.env.local',
	'.env.development',
	'.env.production',
	'.env.sample',
	'.env.example',
]

const formatEnvFile = (filePath: string) => {
	if (!fs.existsSync(filePath)) return

	const content = fs.readFileSync(filePath, 'utf-8')
	const lines = content.split('\n')

	const formattedLines = lines.map((line) => {
		const trimmed = line.trim()
		if (!trimmed || trimmed.startsWith('#')) return line

		const match = trimmed.match(/^([^=]+)=(.*)$/)
		if (!match) return line

		const key = match[1].trim()
		let value = match[2].trim()

		// Remove existing quotes if any (we'll re-add them if needed)
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1)
		}

		// Replace any remaining double quotes within the value with single quotes
		value = value.replace(/"/g, "'")

		// Add single quotes if the value has spaces or special characters
		// The user specifically requested single quotes rule.
		// Always adding single quotes for consistency if the user prefers that.
		return `${key}='${value}'`
	})

	fs.writeFileSync(filePath, formattedLines.join('\n'), 'utf-8')
	// biome-ignore lint/suspicious/noConsole: This is a script
	console.log(`✅ Formatted ${path.basename(filePath)}`)
}

const main = () => {
	const rootDir = process.cwd()
	for (const file of ENV_FILES) {
		const filePath = path.join(rootDir, file)
		formatEnvFile(filePath)
	}
}

main()
