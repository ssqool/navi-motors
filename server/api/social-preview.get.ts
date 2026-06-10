const ALLOWED_HOSTS = ['tiktok.com', 'www.tiktok.com', 'instagram.com', 'www.instagram.com']

export interface SocialPreview {
  postUrl: string
  platform: 'tiktok' | 'instagram'
  thumbnailUrl?: string
  title?: string
  authorName?: string
}

function validateUrl(raw: string): URL {
  let parsed: URL
  try {
    parsed = new URL(raw)
  }
  catch {
    throw createError({ statusCode: 400, statusMessage: 'Невірний URL' })
  }

  const host = parsed.hostname.replace(/^www\./, '')
  if (!ALLOWED_HOSTS.some((h) => h.replace(/^www\./, '') === host)) {
    throw createError({ statusCode: 400, statusMessage: 'Дозволені лише TikTok та Instagram URL' })
  }

  return parsed
}

function getInstagramShortcode(url: URL): string | null {
  const match = url.pathname.match(/\/(?:p|reel|reels|tv)\/([^/]+)/)
  return match?.[1] ?? null
}

function getTikTokVideoId(url: URL): string | null {
  const match = url.pathname.match(/\/video\/(\d+)/)
  return match?.[1] ?? null
}

async function fetchTikTokPreview(postUrl: string): Promise<SocialPreview> {
  const data = await $fetch<{ thumbnail_url?: string; title?: string; author_name?: string }>(
    `https://www.tiktok.com/oembed?url=${encodeURIComponent(postUrl)}`,
  )

  return {
    postUrl,
    platform: 'tiktok',
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    authorName: data.author_name,
  }
}

export default defineEventHandler(async (event) => {
  const rawUrl = getQuery(event).url as string
  if (!rawUrl?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Параметр url обовʼязковий' })
  }

  const parsed = validateUrl(rawUrl.trim())
  const postUrl = parsed.toString()
  const isTikTok = parsed.hostname.includes('tiktok')

  try {
    if (isTikTok) {
      if (!getTikTokVideoId(parsed)) {
        throw createError({ statusCode: 400, statusMessage: 'Потрібне посилання на TikTok відео' })
      }
      return await fetchTikTokPreview(postUrl)
    }

    if (!getInstagramShortcode(parsed)) {
      throw createError({ statusCode: 400, statusMessage: 'Потрібне посилання на Instagram пост' })
    }

    return {
      postUrl,
      platform: 'instagram',
      title: 'Navi Motors — Instagram',
      authorName: '@_navi_motors_',
    }
  }
  catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) throw error
    console.error('[social-preview]', postUrl, error)
    throw createError({ statusCode: 502, statusMessage: 'Не вдалося завантажити дані поста' })
  }
})
