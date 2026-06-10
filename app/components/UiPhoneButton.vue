<script setup lang="ts">
import { siteConfig } from '~/data/site'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})
</script>

<template>
  <a
    :href="`tel:${siteConfig.phone}`"
    class="inline-flex items-center justify-center rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg"
    :class="[
      variant === 'primary'
        ? 'bg-accent text-white hover:bg-accent-hover focus:ring-accent'
        : 'border border-border bg-transparent text-text hover:bg-surface focus:ring-border',
      size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-sm',
    ]"
  >
    Подзвонити
  </a>
</template>
