<script setup lang="ts">
import type { Service } from '~/data/services'

defineProps<{
  service: Service
  featured?: boolean
  index?: number
}>()
</script>

<template>
  <NuxtLink
    :to="`/poslugy/${service.slug}`"
    class="card group relative flex h-full flex-col overflow-hidden"
    :class="featured ? 'border-accent/40 bg-surface ring-1 ring-accent/20' : ''"
  >
    <span
      v-if="featured"
      class="absolute right-4 top-4 rounded-md bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
    >
      Популярна
    </span>

    <span
      v-if="index !== undefined"
      class="mb-3 text-xs font-heading text-accent/60"
    >
      {{ String(index + 1).padStart(2, '0') }}
    </span>

    <h3 class="pr-16 text-lg font-heading uppercase tracking-wide transition-colors group-hover:text-accent">
      {{ service.title }}
    </h3>
    <p class="mt-2 flex-1 text-sm text-text-muted">
      {{ service.shortDescription }}
    </p>
    <div class="mt-4 flex items-center justify-between gap-3">
      <p class="text-sm font-semibold text-accent">
        {{ service.price }}
      </p>
      <span
        class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-text-muted transition-[transform,border-color,color,background-color] duration-300 group-hover:translate-x-0.5 group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:text-accent"
        aria-hidden="true"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </div>
  </NuxtLink>
</template>
