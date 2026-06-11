<script setup lang="ts">
import { benefits } from '~/data/site'
</script>

<template>
  <section class="section-padding">
    <div class="container-narrow">
      <UiReveal>
        <h2 class="section-title">Чому обирають Navi Motors</h2>
        <p class="section-subtitle">
          Спокійний, професійний підхід без зайвого пафосу — діагностика, прозора вартість і чесна робота.
        </p>
      </UiReveal>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <UiReveal
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          :delay="index * 70"
        >
          <div class="card-static h-full">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-base font-heading uppercase tracking-wide">{{ benefit.title }}</h3>
            <p class="mt-2 text-sm text-text-muted">{{ benefit.description }}</p>
          </div>
        </UiReveal>
      </div>
    </div>
  </section>
</template>
