import { siteConfig } from '~/data/site'
import { seoConfig } from '~/data/seo'

interface SeoOptions {
  title: string
  description: string
  path?: string
  image?: string
  /** noindex for error / utility pages */
  noindex?: boolean
  /** Skip canonical URL (e.g. 404 page) */
  skipCanonical?: boolean
  ogType?: 'website' | 'article'
}

export function useSeo(options: SeoOptions) {
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl as string).replace(/\/$/, '')
  const path = options.path ?? '/'
  const url = `${siteUrl}${path === '/' ? '' : path}`
  const image = options.image ?? `${siteUrl}/images/og/navi-motors.png`
  const robots = options.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  useSeoMeta({
    title: options.title,
    description: options.description,
    robots,
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: url,
    ogImage: image,
    ogImageAlt: `${siteConfig.name} — ${siteConfig.tagline}`,
    ogType: options.ogType ?? 'website',
    ogLocale: seoConfig.locale,
    ogSiteName: siteConfig.name,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: image,
  })

  useHead({
    link: [
      ...(options.skipCanonical
        ? []
        : [{ rel: 'canonical', href: url }]),
      { rel: 'alternate', hreflang: seoConfig.locale, href: url },
      { rel: 'alternate', hreflang: 'x-default', href: url },
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
