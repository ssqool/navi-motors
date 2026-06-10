import { siteConfig } from '~/data/site'

interface SeoOptions {
  title: string
  description: string
  path?: string
  image?: string
}

export function useSeo(options: SeoOptions) {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl as string
  const path = options.path ?? '/'
  const url = `${siteUrl}${path}`
  const image = options.image ?? `${siteUrl}/images/og/navi-motors.svg`

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: url,
    ogImage: image,
    ogType: 'website',
    ogLocale: 'uk_UA',
    ogSiteName: siteConfig.name,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: image,
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
  })
}
