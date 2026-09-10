"use client";

import { useRouter } from 'next/navigation'
import { upload } from '@vercel/blob/client'
import { useState } from 'react'

import { IssueForm } from '@/app/types/issue'

export default function NewIssuePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<IssueForm>({
    slug: '',
    title: '',
    number: 0,
    date: '',
    published: false,
    description: ''
  })

  // Ensure published is never undefined
  const published = formData.published ?? false
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [numberStr, setNumberStr] = useState<string>(formData.number.toString())
  const [publicationFile, setPublicationFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const numberValue = numberStr === '' ? '' : Number(numberStr)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (numberStr === '') {
      setError('Please fill all required fields')
      return
    }
    const num = parseInt(numberStr, 10)
    if (!formData.slug || !formData.title || isNaN(num) || num <= 0 || !formData.date) {
      setError('Please fill all required fields')
      return
    }

    setIsLoading(true)
    try {
let publicationUrl = ''
let coverImageUrl = ''

if (publicationFile) {
  const blob = await upload(
    `publications/${publicationFile.name}`,
    publicationFile,
    {
      access: 'public',
      handleUploadUrl: '/api/admin/blob-upload',
    }
  )

  publicationUrl = blob.url
}

if (coverFile) {
  const blob = await upload(
    `covers/${coverFile.name}`,
    coverFile,
    {
      access: 'public',
      handleUploadUrl: '/api/admin/blob-upload',
    }
  )

  coverImageUrl = blob.url
}
const response = await fetch('/api/admin/issues', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    slug: formData.slug,
    title: formData.title,
    number: num,
    date: formData.date,
    published,
    description: formData.description || '',
    publicationUrl,
    coverImageUrl,
  }),
})
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Failed to create issue')
      }

      router.push('/admin/issues')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create issue')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">New Issue</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        {error && <div className="alert alert-error mb-4">
          {error}
        </div>}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Number <span className="text-red-500">*</span></span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={numberValue}
            onChange={(e) => {
              const raw = e.target.value
              setNumberStr(raw === '' ? '' : String(parseInt(raw, 10)))
            }}
            disabled={isLoading}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Title <span className="text-red-500">*</span></span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            disabled={isLoading}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Slug <span className="text-red-500">*</span></span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
            disabled={isLoading}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Date <span className="text-red-500">*</span></span>
          </label>
          <input
            type="date"
            className="input input-bordered"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            disabled={isLoading}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            disabled={isLoading}
            rows={4}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Publication PDF <span className="text-red-500">*</span></span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setPublicationFile(file)
              }
            }}
            disabled={isLoading}
            required
          />
          <div className="label">
            <span className="label-text-alt">Upload the full issue as a PDF. The first page will be used as the cover image.</span>
          </div>
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Cover Image (Optional)</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setCoverFile(file)
              }
            }}
            disabled={isLoading}
          />
          <div className="label">
            <span className="label-text-alt">Optional: Upload a custom cover image. If not provided, the first page of the PDF will be used.</span>
          </div>
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Published</span>
          </label>
          <label className="checkbox checkbox-accent">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({...formData, published: e.target.checked})}
              disabled={isLoading}
            />
            <span className="checkbox-mark checkbox-primary"></span>
            <span className="ml-2">Publish immediately</span>
          </label>
        </div>

        <div className="form-control">
          <button
            type="submit"
            className="btn btn-primary ${isLoading ? 'loading' : ''}"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Issue'}
          </button>
        </div>
      </form>
    </div>
  )
}
