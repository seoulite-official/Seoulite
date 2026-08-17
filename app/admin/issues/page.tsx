import { getIssues } from "@/app/lib/server/issues"
import { Suspense } from "react"
import IssuesList from "./issues-list"
import Link from "next/link"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminIssuesPage() {
  const issues = await getIssues()

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Issues</h1>
        <Link
          href="/admin/issues/new"
          className="inline-flex w-fit items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          New Issue
        </Link>
      </div>
      <Suspense fallback={<div className="text-sm text-gray-500">Loading issues…</div>}>
        <IssuesList issues={issues} />
      </Suspense>
    </div>
  )
}