import { NextResponse, NextRequest } from 'next/server'
import { getIssueBySlug, updateIssue, deleteIssue } from '@/app/lib/server/issues'

export async function GET(request: NextRequest, { params }: { params: Promise<{ issue: string }> }) {
  const { issue } = await params
  const issueData = await getIssueBySlug(issue)
  if (!issueData) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
  }
  return NextResponse.json(issueData)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ issue: string }> }) {
  const { issue } = await params
  try {
    const updatedIssue = await updateIssue(issue, request)
    return NextResponse.json(updatedIssue)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ issue: string }> }) {
  const { issue } = await params
  try {
    await deleteIssue(issue)
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}