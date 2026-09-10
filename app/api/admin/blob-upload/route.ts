import { handleUpload } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/app/lib/server/auth'

export async function POST(request: Request) {
  try {
    await requireAdmin()

    const body = await request.json()

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const folder = pathname.startsWith('publications/')
          ? 'publications/'
          : pathname.startsWith('covers/')
            ? 'covers/'
            : null

        if (!folder) {
          throw new Error('Invalid upload path')
        }

        return {
          allowedContentTypes: pathname.startsWith('publications/')
            ? ['application/pdf']
            : ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async () => {
        // The Issue API will save the returned Blob URL in Prisma.
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('Blob upload authorization failed:', error)

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
