"use client";

import { useRouter } from 'next/navigation'
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
    issuuUrl: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [numberStr, setNumberStr] = useState<string>(formData.number.toString())

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
      const response = await fetch('/api/admin/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          number: num
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create issue')
      }

      router.push('/admin/issues')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating issue')
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

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Issuu Publication URL</span>
          </label>
          <input
            type="url"
            className="input input-bordered"
            value={formData.issuuUrl}
            onChange={(e) => setFormData({...formData, issuuUrl: e.target.value})}
            disabled={isLoading}
            placeholder="https://issuu.com/your-publication"
          />
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