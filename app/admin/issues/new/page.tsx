import { getAdminUser } from '@/app/lib/auth'
import prisma from '@/app/lib/prisma'
import Link from 'next/link'

export default async function NewIssuePage() {
  // Check authentication and authorization
  const user = await getAdminUser()
  if (!user || user.role !== 'EDITOR') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600">You must be logged in as an editor to access the admin panel.</p>
        </div>
      </div>
    )
  }

  // If authorized, show a simple message (to avoid JSX complexity)
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Create New Issue</h1>
          <p className="mt-4">Form would go here.</p>
          <Link
  href="/admin/issues"
  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
>
  ← Back to all issues
</Link>
        </div>
      </header>
    </div>
  )
}
