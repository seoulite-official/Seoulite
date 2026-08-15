import { PrismaClient } from '@/app/generated/prisma/client'

let prisma: PrismaClient

if (typeof window === 'undefined') {
  // In production, create a new instance or use a global one
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })
} else {
  // In development, use a global instance to prevent multiple instances
  // @ts-ignore
  if (!global.__prisma) {
    // @ts-ignore
    global.__prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    })
  }
  // @ts-ignore
  prisma = global.__prisma
}

export default prisma