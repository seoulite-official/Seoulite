import { Auth, type AuthConfig } from "@auth/core"
import Credentials from "@auth/core/providers/credentials"
import { PrismaClient } from "@/app/generated/prisma"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions: AuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user) {
          // Return null to avoid revealing whether an email exists
          return null
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValid) {
          return null
        }

        // Return user object without password
        const { password: _, ...userWithoutPassword } = user
        return userWithoutPassword
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // Secure in production
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login"
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
      }
      return session
    }
  }
}

// Create a handler function for Next.js
export async function GET(request: Request) {
  return Auth(request, authOptions)
}

export async function POST(request: Request) {
  return Auth(request, authOptions)
}
