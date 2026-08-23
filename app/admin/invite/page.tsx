'use client'

import { useState, FormEvent, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

/**
 * Invitation acceptance page.
 * URL: /admin/invite?token=....
 *
 * - Reads the invitation token from the query string.
 * - Shows a form to set password, confirm password, and optional name.
 * - Submits to POST /api/admin/invite.
 * - Handles success, error, missing/invalid token cases.
 * - UI mirrors the simple styling used in other admin pages.
 */
function InvitePageContent() {
  const searchParams = useSearchParams()
  const token = searchParams?.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-center text-red-600">Invalid or missing invitation token.</p>
      </div>
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    // Send to the server – never log raw token or password.
    const res = await fetch('/api/admin/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password, name: name || undefined }),
    })
    const data = await res.json()
    if (res.ok) {
      setMessage('Account created successfully. You can now log in.')
    } else {
      setError(data.error ?? 'Failed to accept invitation')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center">Accept Invitation</h2>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4">
            <p>{error}</p>
          </div>
        )}
        {message && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4">
            <p>{message}</p>
            <p className="mt-2">
              <Link href="/admin/login" className="text-blue-600 hover:underline">
                Go to login
              </Link>
            </p>
          </div>
        )}
        {!message && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name (optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function InvitePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <InvitePageContent />
    </Suspense>
  )
}
