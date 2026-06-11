<script setup lang="ts">
import type { AnalyticsLocation } from '~/types/analytics'
import { siteConfig } from '~/data/site'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  class?: string
  location?: AnalyticsLocation | string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  location: 'unknown',
})

const { trackPhoneClick } = useAnalytics()

function onClick() {
  trackPhoneClick(props.location)
}
</script>

<template>
  <a
    :href="`tel:${siteConfig.phone}`"
    class="inline-flex items-center justify-center rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg"
    :class="[
      props.variant === 'primary'
        ? 'bg-accent text-white hover:bg-accent-hover focus:ring-accent'
        : 'border border-border bg-transparent text-text hover:bg-surface focus:ring-border',
      props.size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-sm',
      props.class,
    ]"
    @click="onClick"
  >
    Подзвонити
  </a>
</template>
