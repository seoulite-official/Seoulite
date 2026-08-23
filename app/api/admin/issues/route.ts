import { NextResponse, NextRequest } from 'next/server'
import { getIssues } from '@/app/lib/server/issues'
import { createIssue } from '@/app/lib/server/issues'
import fs from 'fs/promises'
import path from 'path'
import type { Prisma } from '@/app/generated/prisma'

/**
 * GET all issues (admin endpoint).
 */
export async function GET(request: NextRequest) {
  const issues = await getIssues()
  return NextResponse.json(issues)
}

/**
 * POST a new issue.
 *
 * Expected multipart/form-data fields (text):
 *   - number (string, integer)
 *   - title (string)
 *   - slug (string)
 *   - date (ISO string)
 *   - description (string)
 *   - published ("true"/"false")
 *   - any other custom fields
 *
 * Expected file uploads:
 *   - publication (PDF file) – required for a published issue
 *   - coverImage (image file) – optional
 */
export async function POST(request: NextRequest) {
  // Use the native FormData API – works with NextRequest in the App Router.
  const form = await request.formData()

  const issueData: Record<string, unknown> = {}

  // Process all text fields first.
  for (const [key, value] of form.entries()) {
    if (value instanceof File) continue // skip files for now
    // All values from FormData are strings.
    if (key === 'published') {
      issueData[key] = value === 'true'
    } else if (key === 'number') {
      issueData[key] = parseInt(value as string, 10)
    } else {
      issueData[key] = value
    }
  }

  // Helper to store an uploaded file on disk and return its public path.
  async function storeUpload(file: File, folder: string): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)
    await fs.mkdir(uploadDir, { recursive: true })
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const safeName = file.name.replace(/\s+/g, '-')
    const filename = `${uniqueSuffix}-${safeName}`
    const filePath = path.join(uploadDir, filename)
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(filePath, buffer)
    // Return the public URL that can be used with the media helpers.
    return `/uploads/${folder}/${filename}`
  }

  // Handle PDF (publication) upload.
  const publicationFile = form.get('publication') as File | null
  if (publicationFile && publicationFile.size > 0) {
    const publicPath = await storeUpload(publicationFile, 'publications')
    issueData.publicationKey = publicPath // stored as "/publications/<file>"
    issueData.publicationOriginalName = publicationFile.name
    issueData.publicationSize = publicationFile.size
    issueData.publicationMimeType = publicationFile.type || 'application/pdf'
    issueData.publicationUploadedAt = new Date().toISOString()
  }

  // Handle optional cover image upload.
  const coverFile = form.get('coverImage') as File | null
  if (coverFile && coverFile.size > 0) {
    const publicPath = await storeUpload(coverFile, 'covers')
    issueData.coverImageKey = publicPath // "/covers/<file>"
    issueData.coverImageOriginalName = coverFile.name
    issueData.coverImageSize = coverFile.size
    issueData.coverImageMimeType = coverFile.type || 'image/jpeg'
    issueData.coverImageUploadedAt = new Date().toISOString()
  }

  try {
    const issue = await createIssue(issueData as Prisma.IssueCreateInput)
    return NextResponse.json(issue, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
