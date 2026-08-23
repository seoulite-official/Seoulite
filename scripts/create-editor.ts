#!/usr/bin/env ts-node
import { loadEnvConfig } from "@next/env"
loadEnvConfig(process.cwd())
import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"
import * as readline from "readline"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  console.log("=== Create Seoulite Editor Account (Development Only) ===")
  console.log("This script will create an editor account for local development.")
  console.log("Passwords will be hashed with bcrypt before storage.\n")

  const email = await new Promise<string>((resolve) => {
    rl.question("Enter editor email: ", resolve)
  })

  const password = await new Promise<string>((resolve) => {
    rl.question("Enter password: ", resolve)
  })

  const name = await new Promise<string>((resolve) => {
    rl.question("Enter full name (optional): ", resolve)
  })

  // Validate inputs
  if (!email || !password) {
    console.error("Error: Email and password are required")
    process.exit(1)
  }

  if (password.length < 8) {
    console.error("Warning: Password should be at least 8 characters for security")
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.error(`Error: User with email ${email} already exists`)
      process.exit(1)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
        role: "EDITOR" // Default role for editors
      }
    })

    console.log("\n✅ Editor account created successfully!")
    console.log(`   ID: ${user.id}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Name: ${user.name || "(not set)"}`)
    console.log(`   Role: ${user.role}`)
    console.log(`   Created: ${user.createdAt}`)
    console.log("\n🔑 Use these credentials to log in at /admin/login")
    console.log("\n⚠️  Remember: This is for LOCAL DEVELOPMENT only!")
    console.log("   Never commit real credentials to version control.")

  } catch (error) {
    console.error("❌ Failed to create editor account:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

main()
