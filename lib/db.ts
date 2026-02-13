// Database Connection (Prisma Client)
// Singleton pattern for Next.js (prevents too many connections in dev mode)

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Helper function to test connection
export async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    return { success: true }
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return { success: false, error: String(error) }
  }
}
