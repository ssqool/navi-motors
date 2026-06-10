<script setup lang="ts">
import { siteConfig } from '~/data/site'
import { services } from '~/data/services'
import { reviewStats } from '~/data/reviews'
import type { Service } from '~/data/services'

interface Props {
  service?: Service
}

const props = defineProps<Props>()

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

const schema = computed(() => {
  const sameAs = [
    siteConfig.instagram,
    siteConfig.googleMaps,
    ...(siteConfig.tiktok ? [siteConfig.tiktok] : []),
  ].filter(Boolean)

  const base = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: siteConfig.name,
    image: `${siteUrl}/images/og/navi-motors.svg`,
    logo: `${siteUrl}/images/logo/logo-main.svg`,
    url: siteUrl,
    telephone: siteConfig.phone,
    priceRange: siteConfig.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.city,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.country,
    },
    sameAs,
    areaServed: {
      '@type': 'City',
      name: siteConfig.city,
    },
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewStats.averageRating,
      reviewCount: reviewStats.totalCount,
      bestRating: 5,
      worstRating: 1,
    },
  }

  if (props.service) {
    return {
      ...base,
      '@type': ['AutoRepair', 'Service'],
      name: `${props.service.title} — ${siteConfig.name}`,
      description: props.service.metaDescription,
      url: `${siteUrl}/poslugy/${props.service.slug}`,
    }
  }

  return base
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema.value),
    },
  ],
})
</script>

<template>
  <span class="hidden" aria-hidden="true" />
</template>
