export const buildQuickVideoPrompt = (
	prompt: typeof import('./quickVideoPrompt.v1.json')
): string => {
	return `
Role: ${prompt.role}
Task: ${prompt.task}

Output Format:
${JSON.stringify(prompt.output_format, null, 2)}

Rules:
${prompt.rules.map((rule) => `- ${rule}`).join('\n')}
`.trim()
}
