<script setup lang="ts">
import { heroImage } from '~/data/gallery'
import { siteConfig } from '~/data/site'

interface Props {
  title: string
  subtitle?: string
  showCta?: boolean
  showTrustLine?: boolean
  compact?: boolean
  image?: string
}

const props = withDefaults(defineProps<Props>(), {
  showCta: true,
  showTrustLine: true,
  compact: false,
})

const backgroundImage = computed(() => props.image ?? heroImage.src)

const { trackPhoneClick, trackBookingClick } = useAnalytics()
</script>

<template>
  <section class="relative overflow-hidden border-b border-border bg-bg-soft">
    <div class="absolute inset-0 overflow-hidden">
      <img
        :src="backgroundImage"
        :alt="heroImage.alt"
        width="1600"
        height="900"
        fetchpriority="high"
        decoding="async"
        class="hero-bg-enter hero-bg-zoom absolute inset-0 h-full w-full object-cover opacity-[0.22]"
      >
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-bg via-bg/92 to-bg/55" />
    <div class="absolute inset-0 bg-gradient-to-br from-accent-soft via-transparent to-transparent" />
    <div class="container-narrow relative section-padding" :class="compact ? '!py-12 md:!py-16' : ''">
      <div class="max-w-3xl">
        <h1
          class="hero-enter text-4xl font-heading uppercase tracking-wide md:text-5xl lg:text-6xl"
          style="--hero-delay: 0ms"
        >
          {{ title }}
        </h1>
        <div
          class="hero-enter mt-4 h-1 w-14 rounded-full bg-accent"
          style="--hero-delay: 60ms"
          aria-hidden="true"
        />
        <p
          v-if="subtitle"
          class="hero-enter mt-6 text-lg text-text-soft md:text-xl"
          style="--hero-delay: 100ms"
        >
          {{ subtitle }}
        </p>

        <div
          v-if="showTrustLine"
          class="hero-enter mt-6 flex flex-wrap gap-3"
          style="--hero-delay: 140ms"
        >
          <span class="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/80 px-3 py-2 text-sm text-text-soft backdrop-blur-sm">
            <svg class="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ siteConfig.workingHours }}
          </span>
          <a
            :href="`tel:${siteConfig.phone}`"
            class="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/80 px-3 py-2 text-sm text-text-soft backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent"
            @click="trackPhoneClick('hero_trust_line')"
          >
            <svg class="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {{ siteConfig.phoneDisplay }}
          </a>
        </div>

        <div
          v-if="showCta"
          class="hero-enter mt-8 flex flex-wrap gap-4"
          style="--hero-delay: 200ms"
        >
          <a href="#lead-form" class="btn-primary" @click="trackBookingClick('hero')">
            Записатись на ремонт
          </a>
          <UiPhoneButton variant="secondary" location="hero" />
          <UiMapButton variant="secondary" location="hero" />
        </div>
      </div>
    </div>
  </section>
</template>
