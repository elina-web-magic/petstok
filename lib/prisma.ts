import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'

type PrismaGlobal = { prisma?: PrismaClient }
const globalForPrisma = globalThis as unknown as PrismaGlobal

const createPrismaClient = (databaseUrl: string): PrismaClient => {
	const pool = new Pool({ connectionString: databaseUrl })
	const adapter = new PrismaPg(pool)

	return new PrismaClient({
		adapter,
		log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
	})
}

export const getPrisma = (): PrismaClient => {
	if (globalForPrisma.prisma) return globalForPrisma.prisma

	const databaseUrl = process.env.DATABASE_URL
	if (!databaseUrl) {
		throw new Error('DATABASE_URL is not defined')
	}

	const prisma = createPrismaClient(databaseUrl)

	if (process.env.NODE_ENV !== 'production') {
		globalForPrisma.prisma = prisma
	}

	return prisma
}
