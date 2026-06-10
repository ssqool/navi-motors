<script setup lang="ts">
interface Props {
  /** Reveal delay in ms (stagger effect in grids) */
  delay?: number
  /** fade-up | fade-in | slide-right */
  variant?: 'fade-up' | 'fade-in' | 'slide-right'
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  variant: 'fade-up',
})

const { target, isVisible } = useReveal()
</script>

<template>
  <div
    ref="target"
    class="reveal"
    :class="[`reveal-${variant}`, { 'reveal-visible': isVisible }]"
    :style="{ '--reveal-delay': `${delay}ms` }"
  >
    <slot />
  </div>
</template>
