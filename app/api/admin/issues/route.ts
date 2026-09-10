import { NextResponse, NextRequest } from 'next/server'

import { getIssues, createIssue } from '@/app/lib/server/issues'

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
 * Files are uploaded directly from the browser to Vercel Blob.
 * This endpoint receives only the resulting Blob URLs and issue metadata,
 * avoiding Vercel's serverless function request-size limit.
 */
export async function POST(request: NextRequest) {
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

    const issue = await createIssue(
      issueData as Prisma.IssueCreateInput
    )

    return NextResponse.json(issue, { status: 201 })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error'

    console.error('Failed to create issue:', error)

    return NextResponse.json(
      { error: message },
      { status: 400 }
    )
  }
}
