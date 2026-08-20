import prisma from '@/app/lib/prisma'
import { NextRequest } from 'next/server'
import type { Issue } from '@/app/lib/issues'

export const getIssues = async (): Promise<Issue[]> => {
  return await prisma.issue.findMany({
    orderBy: [{ number: 'asc' }]
  })
}

export const getPublishedIssues = async (): Promise<Issue[]> => {
  return await prisma.issue.findMany({
    where: { published: true },
    orderBy: [{ number: 'desc' }, { date: 'desc' }]
  })
}

export const getLatestPublishedIssue = async (): Promise<Issue | null> => {
  return await prisma.issue.findFirst({
    where: { published: true },
    orderBy: [{ number: 'desc' }, { date: 'desc' }]
  })
}

export const getPublishedIssueBySlug = async (slug: string): Promise<Issue | null> => {
  return await prisma.issue.findFirst({
    where: { slug, published: true }
  })
}

export const createIssue = async (request: NextRequest) => {
  const body = await request.json()

  if (!body.slug || !body.title || !body.number || !body.date) {
    throw new Error('Missing required fields')
  }

  return await prisma.issue.create({
    data: {
      slug: body.slug,
      title: body.title,
      number: body.number,
      date: body.date,
      description: body.description ?? '',
      published: body.published || false,
    }
  })
}

export const updateIssue = async (issueSlug: string, request: NextRequest) => {
  const body = await request.json()

  const issue = await prisma.issue.findUnique({
    where: { slug: issueSlug }
  })

  if (!issue) {
    throw new Error('Issue not found')
  }

  return await prisma.issue.update({
    where: { slug: issueSlug },
    data: {
      title: body.title,
      slug: body.slug,
      number: body.number,
      date: body.date,
      description: body.description ?? issue.description,
      published: body.published,
    }
  })
}

export const deleteIssue = async (issueSlug: string) => {
  const issue = await prisma.issue.findUnique({
    where: { slug: issueSlug }
  })

  if (!issue) {
    throw new Error('Issue not found')
  }

  await prisma.issue.delete({
    where: { slug: issueSlug }
  })

  return { success: true }
}

export const getIssueBySlug = async (slug: string): Promise<Issue | null> => {
  return await prisma.issue.findUnique({
    where: { slug }
  })
}

export const getArticleBySlug = async (issueSlug: string, articleSlug: string) => {
  const issue = await prisma.issue.findUnique({
    where: { slug: issueSlug }
  })

  if (!issue) {
    return undefined
  }

  // For now, we'll return a placeholder since we don't have articles table yet
  // In a real implementation, this would query the articles table
  return {
    slug: articleSlug,
    title: `Article ${articleSlug}`,
    author: "Seoulite Team",
    category: "Editorial",
    excerpt: "This is a placeholder article. Real article content will be available when the articles table is implemented.",
    image: undefined,
    contentPlaceholder: "Article content will be available here once the articles system is fully implemented."
  }
}