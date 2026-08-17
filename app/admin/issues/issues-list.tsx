'use client'

import Link from "next/link"
import { useState } from "react"
import { Issue } from "@/app/types/issue"

type Props = { issues: Issue[] }

export default function IssuesList({ issues: initialIssues }: Props) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Delete this issue?")) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/issues/${slug}`, { method: "DELETE" })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Delete failed")
      }
      setIssues((prev) => prev.filter((issue) => issue.slug !== slug))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p>Saving…</p>
  }

  if (issues.length === 0) {
    return (
      <div className="rounded-md border border-gray-200 bg-gray-50 p-6 text-center">
        <p className="text-gray-600">No issues yet.</p>
        <Link
          href="/admin/issues/new"
          className="mt-2 inline-block text-sm font-medium text-gray-900 underline"
        >
          Create your first issue
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">#</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Title</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {issues.map((issue) => (
            <tr key={issue.id || issue.slug} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{issue.number}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {issue.title}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{issue.date}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {issue.published ? "Published" : "Draft"}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                <Link
                  href={`/admin/issues/${issue.slug}`}
                  className="text-gray-900 underline hover:no-underline"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(issue.slug)}
                  disabled={loading}
                  className="ml-3 text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  )
}