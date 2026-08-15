"use server"

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

/**
 * Get the user from the NextAuth JWT token in the cookies.
 * This function is intended for use in server components to get the logged-in user.
 * It verifies the token and returns the user object (as stored in the token by the jwt callback).
 * Returns null if the token is invalid or not present.
 */
export async function getAdminUser(): Promise<{ id: string; email: string; name: string | null; role: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('__Secure-next-auth.session-token')?.value ||
                cookieStore.get('next-auth.session-token')?.value

  if (!token) {
    return null
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    // The payload should have the user we set in the jwt callback
    return payload as { id: string; email: string; name: string | null; role: string }
  } catch (error) {
    // Token verification failed
    return null
  }
}