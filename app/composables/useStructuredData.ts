import { siteConfig } from '~/data/site'
import { services } from '~/data/services'
import { reviewStats } from '~/data/reviews'
import { seoConfig } from '~/data/seo'
import type { Service } from '~/data/services'

export interface BreadcrumbItem {
  name: string
  path: string
}

export interface FaqItem {
  question: string
  answer: string
}

interface StructuredDataOptions {
  service?: Service
  breadcrumbs?: BreadcrumbItem[]
  faq?: readonly FaqItem[]
  pageType?: 'home' | 'services' | 'service' | 'contact'
}

export function useStructuredData(options: StructuredDataOptions = {}) {
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl as string).replace(/\/$/, '')

  const businessId = `${siteUrl}/#business`
  const websiteId = `${siteUrl}/#website`
  const pageUrl = options.breadcrumbs?.length
    ? `${siteUrl}${options.breadcrumbs[options.breadcrumbs.length - 1]!.path}`
    : siteUrl

  const sameAs = [
    siteConfig.instagram,
    siteConfig.googleMaps,
    siteConfig.tiktok,
    siteConfig.telegram,
  ].filter(Boolean)

  const autoRepair: Record<string, unknown> = {
    '@type': 'AutoRepair',
    '@id': businessId,
    name: siteConfig.name,
    description: seoConfig.businessDescription,
    image: `${siteUrl}/images/og/navi-motors.png`,
    logo: `${siteUrl}/logo.svg`,
    url: siteUrl,
    telephone: siteConfig.phone,
    priceRange: siteConfig.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.city,
      postalCode: siteConfig.postalCode,
      addressRegion: 'Київ',
      addressCountry: siteConfig.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.googleMaps,
    sameAs,
    areaServed: siteConfig.areasServed.map((name) => ({
      '@type': 'City',
      name,
    })),
    openingHoursSpecification: siteConfig.workingHoursSchema.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        url: `${siteUrl}/poslugy/${s.slug}`,
      },
    })),
  }

  if (seoConfig.includeAggregateRating) {
    autoRepair.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviewStats.averageRating,
      reviewCount: reviewStats.totalCount,
      bestRating: 5,
      worstRating: 1,
    }
  }

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteUrl,
    name: siteConfig.name,
    description: seoConfig.siteDescription,
    inLanguage: seoConfig.locale,
    publisher: { '@id': businessId },
  }

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: options.service?.metaTitle ?? siteConfig.name,
    description: options.service?.metaDescription ?? seoConfig.siteDescription,
    isPartOf: { '@id': websiteId },
    about: { '@id': businessId },
    inLanguage: seoConfig.locale,
  }

  if (options.pageType === 'contact') {
    webPage['@type'] = 'ContactPage'
  }

  if (options.pageType === 'home') {
    webPage.name = 'Navi Motors — СТО у Києві | Ремонт авто та діагностика'
    webPage.description = seoConfig.siteDescription
  }

  const graph: Record<string, unknown>[] = [autoRepair, website, webPage]

  if (options.breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: options.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${siteUrl}${item.path}`,
      })),
    })
  }

  if (options.pageType === 'services') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${siteUrl}/poslugy#services`,
      name: 'Послуги Navi Motors',
      itemListElement: services.map((s, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: s.title,
        url: `${siteUrl}/poslugy/${s.slug}`,
      })),
    })
  }

  if (options.service) {
    const priceMatch = options.service.price.match(/\d[\d\s]*/)
    const offer: Record<string, unknown> = {
      '@type': 'Offer',
      priceCurrency: 'UAH',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/poslugy/${options.service.slug}`,
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'UAH',
        description: options.service.price,
      },
    }
    if (priceMatch) {
      offer.price = priceMatch[0]!.replace(/\s/g, '')
    }

    graph.push({
      '@type': 'Service',
      '@id': `${siteUrl}/poslugy/${options.service.slug}#service`,
      name: options.service.title,
      description: options.service.metaDescription,
      url: `${siteUrl}/poslugy/${options.service.slug}`,
      provider: { '@id': businessId },
      areaServed: {
        '@type': 'City',
        name: siteConfig.city,
      },
      offers: offer,
    })
  }

  if (options.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: options.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        key: 'structured-data',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph,
        }),
      },
    ],
  })
}
