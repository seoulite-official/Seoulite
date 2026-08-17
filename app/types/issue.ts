export type Issue = {
  id: string
  slug: string
  number: number
  title: string | null
  description?: string
  date: string
  published: boolean
  publishedAt?: Date | null
  createdAt: Date
  updatedAt: Date
  coverImageKey?: string | null
  coverImageOriginalName?: string | null
  coverImageSize?: number | null
  coverImageMimeType?: string | null
  coverImageUploadedAt?: Date | null
  publicationKey?: string | null
  publicationOriginalName?: string | null
  publicationSize?: number | null
  publicationMimeType?: string | null
  publicationUploadedAt?: Date | null
  issuuUrl?: string | null
}

export type IssueForm = {
  slug: string
  title: string
  number: number
  date: string
  published?: boolean
  issuuUrl?: string
}