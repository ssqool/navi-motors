<script setup lang="ts">
import type { SocialPlatform } from '~/components/UiSocialIcon.vue'
import type { AnalyticsLocation } from '~/types/analytics'

const props = withDefaults(defineProps<{
  platform: SocialPlatform
  href: string
  label: string
  location?: AnalyticsLocation | string
  variant?: 'inline' | 'button' | 'button-primary'
  external?: boolean
}>(), {
  variant: 'inline',
  external: true,
})

const { trackOutboundClick } = useAnalytics()

function onClick() {
  trackOutboundClick(props.platform, props.href, props.location ?? 'unknown')
}
</script>

<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="link-focus inline-flex items-center gap-2 transition-colors"
    :class="[
      variant === 'inline' ? 'hover:text-accent' : '',
      variant === 'button-primary' ? 'btn-primary' : '',
      variant === 'button' ? 'btn-secondary' : '',
    ]"
    @click="onClick"
  >
    <UiSocialIcon :platform="platform" class="h-5 w-5 shrink-0" />
    <span>{{ label }}</span>
  </a>
</template>
