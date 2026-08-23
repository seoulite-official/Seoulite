import { NextResponse, NextRequest } from 'next/server'
import { getIssueBySlug, updateIssue, deleteIssue } from '@/app/lib/server/issues'
import fs from 'fs/promises'
import path from 'path'

type MultipartFields = Record<string, string | string[]>

/**
 * GET a single issue by slug (admin endpoint).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ issue: string }> }
) {
  const { issue } = await params
  const issueData = await getIssueBySlug(issue)
  if (!issueData) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
  }
  return NextResponse.json(issueData)
}

/**
 * PUT update an existing issue.
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
 *   - publication (PDF file) – optional (replaces existing)
 *   - coverImage (image file) – optional (replaces existing)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ issue: string }> }
) {
  const { issue: slug } = await params
  const form = await request.formData()

  const issueData: any = {}

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

  // Handle PDF (publication) upload (optional replacement).
  const publicationFile = form.get('publication') as File | null
  if (publicationFile && publicationFile.size > 0) {
    const publicPath = await storeUpload(publicationFile, 'publications')
    issueData.publicationKey = publicPath
    issueData.publicationOriginalName = publicationFile.name
    issueData.publicationSize = publicationFile.size
    issueData.publicationMimeType = publicationFile.type || 'application/pdf'
    issueData.publicationUploadedAt = new Date().toISOString()
  }

  // Handle optional cover image upload (optional replacement).
  const coverFile = form.get('coverImage') as File | null
  if (coverFile && coverFile.size > 0) {
    const publicPath = await storeUpload(coverFile, 'covers')
    issueData.coverImageKey = publicPath
    issueData.coverImageOriginalName = coverFile.name
    issueData.coverImageSize = coverFile.size
    issueData.coverImageMimeType = coverFile.type || 'image/jpeg'
    issueData.coverImageUploadedAt = new Date().toISOString()
  }

  try {
    const updatedIssue = await updateIssue(slug, issueData)
    return NextResponse.json(updatedIssue)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

/**
 * DELETE an issue by slug.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ issue: string }> }
) {
  const { issue } = await params
  try {
    await deleteIssue(issue)
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}