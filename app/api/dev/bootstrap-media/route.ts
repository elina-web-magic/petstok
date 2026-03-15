import { PET_ID } from '@/globalConstants'
import { getPrisma } from '@/lib/prisma'
import { seedDatabase } from '@/prisma/seed'
import { importCloudinaryVideosByTag } from '@/server/dev/importCloudinaryVideosByTag'

export const runtime = 'nodejs'

export async function POST() {
	if (process.env.NODE_ENV !== 'development') {
		return Response.json({ error: 'Not allowed' }, { status: 403 })
	}

	try {
		const prisma = getPrisma()

		const existingUser = await prisma.user.findUnique({
			where: {
				id: 1,
			},
			select: {
				id: true,
			},
		})

		let seedResult: { skipped: boolean } | Awaited<ReturnType<typeof seedDatabase>>

		if (existingUser) {
			seedResult = { skipped: true }
		} else {
			seedResult = await seedDatabase()
		}

		const importResult = await importCloudinaryVideosByTag({
			tag: 'alisa',
			petId: PET_ID,
		})

		return Response.json(
			{
				ok: true,
				seedResult,
				importResult,
			},
			{ status: 200 }
		)
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Failed to run dev bootstrap'

		return Response.json(
			{
				ok: false,
				error: message,
			},
			{ status: 500 }
		)
	}
}
