'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Issue } from '@/app/types/issue'

type Props = { issue: Issue }

export default function EditForm({ issue }: Props) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    number: issue.number,
    slug: issue.slug,
    title: issue.title ?? '',
    date: issue.date,
    published: issue.published,
    description: issue.description ?? '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [publicationFile, setPublicationFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title || !formData.slug || !formData.date) {
      setError('Title, slug, and date are required.')
      return
    }

    setIsSubmitting(true)
    try {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('number', formData.number.toString())
      formDataToSubmit.append('slug', formData.slug)
      formDataToSubmit.append('title', formData.title)
      formDataToSubmit.append('date', formData.date)
      formDataToSubmit.append('published', formData.published.toString())
      formDataToSubmit.append('description', formData.description)

      if (publicationFile) {
        formDataToSubmit.append('publication', publicationFile)
      }
      if (coverFile) {
        formDataToSubmit.append('coverImage', coverFile)
      }

      const res = await fetch(`/api/admin/issues/${issue.slug}`, {
        method: 'PUT',
        body: formDataToSubmit
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Failed to update issue')
      }

      router.push('/admin/issues')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update issue')
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Permanently delete this issue? This cannot be undone.')) return

    try {
      const res = await fetch(`/api/admin/issues/${issue.slug}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Failed to delete issue')
      }

      router.push('/admin/issues')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete issue')
    }
  }

  return (
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Number
          </label>
          <input
            id="number"
            type="number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: parseInt(e.target.value, 10) })}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="publicationFile" className="block text-sm font-medium text-gray-700">
            Publication PDF
          </label>
          <input
            type="file"
            id="publicationFile"
            className="file-input file-input-bordered w-full"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setPublicationFile(file)
              }
            }}
            disabled={isSubmitting}
          />
          <div className="label">
            <span className="label-text-alt">Upload the full issue as a PDF. The first page will be used as the cover image.</span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="coverFile" className="block text-sm font-medium text-gray-700">
            Cover Image (Optional)
          </label>
          <input
            type="file"
            id="coverFile"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setCoverFile(file)
              }
            }}
            disabled={isSubmitting}
          />
          <div className="label">
            <span className="label-text-alt">Optional: Upload a custom cover image. If not provided, the first page of the PDF will be used.</span>
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <input
            id="published"
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            disabled={isSubmitting}
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
            Published
          </label>
        </div>


        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isSubmitting}
            className="rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </form>
  )
}