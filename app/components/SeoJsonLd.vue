<script setup lang="ts">
import { homepageFaq } from '~/data/seo'
import type { Service } from '~/data/services'
import type { BreadcrumbItem, FaqItem } from '~/composables/useStructuredData'

interface Props {
  service?: Service
  breadcrumbs?: BreadcrumbItem[]
  faq?: readonly FaqItem[]
  pageType?: 'home' | 'services' | 'service' | 'contact'
}

const props = defineProps<Props>()

const faqItems = computed(() => {
  if (props.faq) return props.faq
  if (props.service?.faq.length) return props.service.faq
  if (props.pageType === 'home') return homepageFaq
  return undefined
})

useStructuredData({
  service: props.service,
  breadcrumbs: props.breadcrumbs,
  faq: faqItems.value,
  pageType: props.pageType ?? (props.service ? 'service' : undefined),
})
</script>

<template>
  <span class="hidden" aria-hidden="true" />
</template>
