"use client"

import { signOut } from "next-auth/react"

/**
 * Client-side logout button that uses Auth.js v5's signOut helper.
 * This provides the required CSRF token automatically.
 */
export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login", redirect: true })}
      className="text-sm font-medium text-red-600 hover:text-red-500"
    >
      Sign out
    </button>
  )
}