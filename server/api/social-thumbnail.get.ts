const ALLOWED_HOSTS = ['tiktok.com', 'www.tiktok.com', 'instagram.com', 'www.instagram.com']

function validateUrl(raw: string): URL {
  const parsed = new URL(raw)
  const host = parsed.hostname.replace(/^www\./, '')
  if (!ALLOWED_HOSTS.some((h) => h.replace(/^www\./, '') === host)) {
    throw createError({ statusCode: 400, statusMessage: 'Невірний URL' })
  }
  return parsed
}

function tiktokPlaceholderSvg(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" fill="none">
  <rect width="600" height="600" fill="#141414"/>
  <rect x="40" y="40" width="520" height="520" rx="24" stroke="#2A2A2A" stroke-width="2"/>
  <path d="M260 220 L340 300 L260 380 Z" fill="#D62828"/>
  <text x="300" y="430" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="600" fill="#F5F5F5">TikTok</text>
  <text x="300" y="465" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" fill="#A3A3A3">Navi Motors</text>
</svg>`
}

async function fetchTikTokThumbnail(postUrl: string): Promise<{ buffer: ArrayBuffer; contentType: string }> {
  const meta = await $fetch<{ thumbnail_url?: string }>(
    `https://www.tiktok.com/oembed?url=${encodeURIComponent(postUrl)}`,
  )

  if (!meta.thumbnail_url) {
    throw new Error('TikTok thumbnail not found')
  }

  const response = await fetch(meta.thumbnail_url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NaviMotors/1.0)' },
  })

  if (!response.ok) {
    throw new Error(`TikTok thumbnail fetch failed: ${response.status}`)
  }

  return {
    buffer: await response.arrayBuffer(),
    contentType: response.headers.get('content-type') || 'image/jpeg',
  }
}

export default defineEventHandler(async (event) => {
  const rawUrl = getQuery(event).url as string
  if (!rawUrl?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Параметр url обовʼязковий' })
  }

  let parsed: URL
  try {
    parsed = validateUrl(rawUrl.trim())
  }
  catch {
    throw createError({ statusCode: 400, statusMessage: 'Невірний URL' })
  }

  if (!parsed.hostname.includes('tiktok')) {
    throw createError({ statusCode: 400, statusMessage: 'Проксі доступний лише для TikTok' })
  }

  setHeader(event, 'Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')

  try {
    const { buffer, contentType } = await fetchTikTokThumbnail(parsed.toString())
    setHeader(event, 'Content-Type', contentType)
    return buffer
  }
  catch (error) {
    console.error('[social-thumbnail]', rawUrl, error)
    setHeader(event, 'Content-Type', 'image/svg+xml')
    return tiktokPlaceholderSvg()
  }
})
