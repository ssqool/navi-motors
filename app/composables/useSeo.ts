import { siteConfig } from '~/data/site'
import { seoConfig } from '~/data/seo'

interface SeoOptions {
  title: string
  description: string
  /** Shorter copy for og:description / Twitter (~125 chars). Falls back to description. */
  ogDescription?: string
  path?: string
  image?: string
  /** noindex for error / utility pages */
  noindex?: boolean
  /** Skip canonical URL (e.g. 404 page) */
  skipCanonical?: boolean
  ogType?: 'website' | 'article'
}

function resolveOrigin(fallbackSiteUrl: string): string {
  const fallback = fallbackSiteUrl.replace(/\/$/, '')

  if (import.meta.server) {
    try {
      return useRequestURL().origin
    } catch {
      return fallback
    }
  }

  if (import.meta.client && typeof window !== 'undefined') {
    return window.location.origin
  }

  return fallback
}

function resolveAbsoluteUrl(pathOrUrl: string, origin: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${origin}${path}`
}

export function useSeo(options: SeoOptions) {
  const config = useRuntimeConfig()
  const configuredSiteUrl = (config.public.siteUrl as string).replace(/\/$/, '')
  const origin = resolveOrigin(configuredSiteUrl)
  const path = options.path ?? '/'
  const canonicalUrl = `${configuredSiteUrl}${path === '/' ? '' : path}`
  const pageUrl = `${origin}${path === '/' ? '' : path}`
  const imagePath = options.image ?? seoConfig.ogImage.path
  const image = resolveAbsoluteUrl(imagePath, origin)
  const ogDescription = options.ogDescription ?? options.description
  const robots = options.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  useSeoMeta({
    title: options.title,
    description: options.description,
    robots,
    ogTitle: options.title,
    ogDescription,
    ogUrl: pageUrl,
    ogImage: image,
    ogImageWidth: seoConfig.ogImage.width,
    ogImageHeight: seoConfig.ogImage.height,
    ogImageAlt: seoConfig.ogImage.alt,
    ogType: options.ogType ?? 'website',
    ogLocale: seoConfig.locale,
    ogSiteName: siteConfig.name,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: ogDescription,
    twitterImage: image,
  })

  useHead({
    link: [
      ...(options.skipCanonical
        ? []
        : [{ rel: 'canonical', href: canonicalUrl }]),
      { rel: 'alternate', hreflang: seoConfig.locale, href: canonicalUrl },
      { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl },
    ],
    meta: [
      { name: 'geo.region', content: seoConfig.geoRegion },
      { name: 'geo.placename', content: seoConfig.geoPlacename },
      {
        name: 'geo.position',
        content: `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      },
      { name: 'ICBM', content: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}` },
      { name: 'author', content: siteConfig.name },
      { name: 'format-detection', content: 'telephone=yes' },
    ],
  })
}
