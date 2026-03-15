import { PET_ID } from '@/globalConstants'
import { importCloudinaryVideosByTag } from '@/server/dev/importCloudinaryVideosByTag'

export const runtime = 'nodejs'

export async function POST() {
	if (process.env.NODE_ENV !== 'development')
		return Response.json({ error: 'Not allowed' }, { status: 403 })

	const result = await importCloudinaryVideosByTag({
		tag: 'alisa',
		petId: PET_ID,
	})

	return Response.json(
		{
			ok: true,
			...result,
		},
		{ status: 200 }
	)
}
