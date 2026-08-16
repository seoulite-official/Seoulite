import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

let prisma: PrismaClient

if (typeof window === 'undefined') {
  // In production, create a new instance or use a global one
  const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! })
  prisma = new PrismaClient({ adapter })
} else {
  // In development, use a global instance to prevent multiple instances
  // @ts-expect-error - __prisma is a custom global property
  if (!global.__prisma) {
    const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! })
    // @ts-expect-error - __prisma is a custom global property
    global.__prisma = new PrismaClient({ adapter })
  }
  // @ts-expect-error - __prisma is a custom global property
  prisma = global.__prisma
}

export default prisma
