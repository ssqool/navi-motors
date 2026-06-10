import { services } from '~/data/services'

export default defineSitemapEventHandler(() => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl as string).replace(/\/$/, '')
  const lastmod = new Date().toISOString()

  const staticPages = [
    { loc: '/', priority: 1.0, changefreq: 'weekly' as const },
    { loc: '/poslugy', priority: 0.9, changefreq: 'weekly' as const },
    { loc: '/pro-nas', priority: 0.7, changefreq: 'monthly' as const },
    { loc: '/kontakty', priority: 0.8, changefreq: 'monthly' as const },
    { loc: '/polityka-konfidentsiynosti', priority: 0.3, changefreq: 'yearly' as const },
  ]

  const servicePages = services.map((service) => ({
    loc: `/poslugy/${service.slug}`,
    priority: 0.8,
    changefreq: 'monthly' as const,
  }))

  return [...staticPages, ...servicePages].map((page) => ({
    ...page,
    loc: `${siteUrl}${page.loc}`,
    lastmod,
  }))
})
