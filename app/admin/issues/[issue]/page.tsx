import prisma from '@/app/lib/prisma'

export default async function AdminIssueDetailPage({
  params,
}: {
  params: { issue: string }
}) {
  // Get issue ID from params (this is actually the database ID, not slug)
  const issueId = params.issue

  // Fetch the issue from database
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  })

  if (!issue) {
    // Issue not found
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Issue Not Found</h2>
          <p className="text-gray-600">The requested issue does not exist.</p>
          <div className="mt-6">
            <a
              href="/admin/issues"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              ← Back to all issues
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Issue #{issue.number}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {/* User info would come from auth context or middleware */}
              </span>
              <form action="/api/auth/signout" method="POST" className="mt-2">
                <button
                  type="submit"
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Issue Details
            </h2>
            <p className="mb-2"><strong>Slug:</strong> {issue.slug}</p>
            <p className="mb-2"><strong>Number:</strong> {issue.number}</p>
            <p className="mb-2"><strong>Date:</strong> {issue.date || '(Not set)'}</p>
            <p className="mb-2"><strong>Title:</strong> {issue.title || '(Not set)'}</p>
            <p className="mb-2"><strong>Description:</strong> {issue.description || '(Not set)'}</p>
            <p className="mb-2"><strong>Status:</strong> {issue.published ? 'Published' : 'Draft'}</p>
            <div className="mt-4">
              <a
                href="/admin/issues"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                ← Back to all issues
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}