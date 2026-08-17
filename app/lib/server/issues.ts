import prisma from '@/app/lib/prisma'
import { NextRequest } from 'next/server'

export const getIssues = async () => {
  return await prisma.issue.findMany({
    orderBy: [{ number: 'asc' }]
  })
}

export const getPublishedIssues = async () => {
  return await prisma.issue.findMany({
    where: { published: true },
    orderBy: [{ number: 'asc' }]
  })
}

export const getPublishedIssueBySlug = async (slug: string) => {
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
      issuuUrl: body.issuuUrl || null,
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
      issuuUrl: body.issuuUrl || null
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

export const getIssueBySlug = async (slug: string) => {
  return await prisma.issue.findUnique({
    where: { slug }
  })
}