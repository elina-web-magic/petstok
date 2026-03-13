import { importCloudinaryVideosByTag } from '@/server/dev/importCloudinaryVideosByTag'

export const runtime = 'nodejs'

export async function POST() {
	if (process.env.NODE_ENV !== 'development')
		return Response.json({ error: 'Not allowed' }, { status: 403 })

	const result = await importCloudinaryVideosByTag({
		tag: 'alisa',
		petId: 11,
	})

	return Response.json(
		{
			ok: true,
			...result,
		},
		{ status: 200 }
	)
}
