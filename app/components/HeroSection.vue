<script setup lang="ts">
import { heroImage } from '~/data/gallery'

interface Props {
  title: string
  subtitle?: string
  showCta?: boolean
  compact?: boolean
  image?: string
}

const props = withDefaults(defineProps<Props>(), {
  showCta: true,
  compact: false,
})

const backgroundImage = computed(() => props.image ?? heroImage.src)
</script>

<template>
  <section class="relative overflow-hidden border-b border-border bg-bg-soft">
    <img
      :src="backgroundImage"
      :alt="heroImage.alt"
      width="1600"
      height="900"
      fetchpriority="high"
      decoding="async"
      class="hero-bg-enter absolute inset-0 h-full w-full object-cover opacity-20"
    >
    <div class="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/60" />
    <div class="absolute inset-0 bg-gradient-to-br from-accent-soft via-transparent to-transparent" />
    <div class="container-narrow relative section-padding" :class="compact ? '!py-12 md:!py-16' : ''">
      <div class="max-w-3xl">
        <h1
          class="hero-enter text-4xl font-heading uppercase tracking-wide md:text-5xl lg:text-6xl"
          style="--hero-delay: 0ms"
        >
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="hero-enter mt-6 text-lg text-text-soft md:text-xl"
          style="--hero-delay: 90ms"
        >
          {{ subtitle }}
        </p>
        <div
          v-if="showCta"
          class="hero-enter mt-8 flex flex-wrap gap-4"
          style="--hero-delay: 180ms"
        >
          <a href="#lead-form" class="btn-primary">
            Записатись на ремонт
          </a>
          <UiPhoneButton variant="secondary" />
          <UiMapButton variant="secondary" />
        </div>
      </div>
    </div>
  </section>
</template>
