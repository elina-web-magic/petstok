export const runtime = 'nodejs'

export const POST = async (): Promise<Response> => {
	return Response.json({
		tags: ['#cat', '#blindcat', '#alisa'],
		isAlice: true,
		isBlindCat: true,
		confidence: {
			alice: 0.82,
			blindcat: 0.94,
		},
		rationale: 'Mock response from /api/ai/pet-tags.',
	})
}
