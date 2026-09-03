import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  // For now, we'll implement a simple version that checks for cookies
  // A more robust implementation would require the @auth/core token utilities
  // which we determined aren't available in the current version

  const { pathname } = request.nextUrl

  // Protect admin routes - check for auth cookie
if (
  pathname.startsWith("/admin") &&
  pathname !== "/admin/login" &&
  pathname !== "/admin/invite"
) {
    const hasAuthCookie =
      request.cookies.has("__Secure-authjs.session-token") ||
      request.cookies.has("authjs.session-token") ||
      request.cookies.has("__Secure-next-auth.session-token") ||
      request.cookies.has("next-auth.session-token")

    if (!hasAuthCookie) {
      // Redirect to login if not authenticated
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      url.search = `callbackUrl=${encodeURIComponent(pathname)}`
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/api (next.js internals)
     * - _next/static (next.js static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/api|_next/static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
