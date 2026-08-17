import { NextResponse, NextRequest } from 'next/server'
import { getIssues } from '@/app/lib/server/issues'
import { createIssue } from '@/app/lib/server/issues'

export async function GET(request: NextRequest) {
  const issues = await getIssues()
  return NextResponse.json(issues)
}

export async function POST(request: NextRequest) {
  try {
    const issue = await createIssue(request)
    return NextResponse.json(issue, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}