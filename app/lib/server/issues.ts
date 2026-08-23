import prisma from '@/app/lib/prisma'
import type { Issue } from '@/app/lib/issues'
import type { Prisma } from '@/app/generated/prisma'

export const getIssues = async (): Promise<Issue[]> => {
  return await prisma.issue.findMany({
    orderBy: [{ number: 'asc' }]
  })
}

export const getPublishedIssues = async (): Promise<Issue[]> => {
  return await prisma.issue.findMany({
    where: { published: true },
    orderBy: [{ date: 'desc' }, { number: 'desc' }]
  })
}

export const getRecentIssues = async (count: number): Promise<Issue[]> => {
  return await prisma.issue.findMany({
    where: { published: true },
    orderBy: [{ date: 'desc' }, { number: 'desc' }],
    take: count
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

export const createIssue = async (data: Prisma.IssueCreateInput) => {
  return await prisma.issue.create({ data })
}

export const updateIssue = async (slug: string, data: Prisma.IssueUpdateInput) => {
  return await prisma.issue.update({ where: { slug }, data })
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