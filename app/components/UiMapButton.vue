<script setup lang="ts">
import type { AnalyticsLocation } from '~/types/analytics'
import { siteConfig } from '~/data/site'

interface Props {
  variant?: 'primary' | 'secondary'
  location?: AnalyticsLocation | string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  location: 'unknown',
})

const { trackMapClick } = useAnalytics()

function onClick() {
  trackMapClick(props.location)
}
</script>

<template>
  <a
    :href="siteConfig.googleMaps"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg"
    :class="
      variant === 'primary'
        ? 'bg-accent text-white hover:bg-accent-hover focus:ring-accent'
        : 'border border-border bg-transparent text-text hover:bg-surface focus:ring-border'
    "
    @click="onClick"
  >
    Прокласти маршрут
  </a>
</template>
