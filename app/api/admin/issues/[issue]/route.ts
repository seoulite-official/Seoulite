import { NextResponse, NextRequest } from 'next/server'
import { getIssueBySlug, updateIssue, deleteIssue } from '@/app/lib/server/issues'
import type { Prisma } from '@/app/generated/prisma'


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
 * File uploads are handled directly by the client through Vercel Blob.
 * This route receives the resulting public Blob URLs along with issue metadata.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ issue: string }> }
) {
  const { issue: slug } = await params

  try {
    const body = await request.json()

    const issueData: Record<string, unknown> = {
      slug: body.slug,
      title: body.title,
      number: Number(body.number),
      date: body.date,
      description: body.description || '',
      published: Boolean(body.published),
    }

    if (typeof body.publicationUrl === 'string' && body.publicationUrl) {
      issueData.publicationKey = body.publicationUrl
    }

    if (typeof body.coverImageUrl === 'string' && body.coverImageUrl) {
      issueData.coverImageKey = body.coverImageUrl
    }

    const updatedIssue = await updateIssue(
      slug,
      issueData as Prisma.IssueUpdateInput
    )

    return NextResponse.json(updatedIssue)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error'

    console.error('Failed to update issue:', error)

    return NextResponse.json(
      { error: message },
      { status: 400 }
    )
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
