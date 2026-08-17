import Link from 'next/link'
import { getIssueBySlug } from '@/app/lib/server/issues'
import EditForm from './edit-form'

export const dynamic = 'force-dynamic'

export default async function EditIssuePage({ params }: { params: Promise<{ issue: string }> }) {
  const { issue: slug } = await params
  const issue = await getIssueBySlug(slug)

  if (!issue) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-red-200 bg-red-50 p-6 text-red-700">
          Issue not found.
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Issue</h1>
        <Link
          href="/admin/issues"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Back
        </Link>
      </div>

      <EditForm issue={issue} />
    </div>
  )
}
