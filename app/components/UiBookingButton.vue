<script setup lang="ts">
import type { AnalyticsLocation } from '~/types/analytics'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  class?: string
  location?: AnalyticsLocation | string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'sm',
  location: 'unknown',
})

const { bookingTo } = useBookingLink()
const { trackBookingClick } = useAnalytics()

function onClick() {
  trackBookingClick(props.location)
}
</script>

<template>
  <NuxtLink
    :to="bookingTo"
    class="inline-flex items-center justify-center rounded-xl font-semibold transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg"
    :class="[
      props.variant === 'primary'
        ? 'bg-accent text-white hover:bg-accent-hover focus:ring-accent'
        : 'border border-border bg-transparent text-text hover:border-accent/40 hover:bg-surface focus:ring-border',
      props.size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-sm',
      props.class,
    ]"
    @click="onClick"
  >
    Залишити заявку
  </NuxtLink>
</template>
