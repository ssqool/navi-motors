<script setup lang="ts">
import { prices, priceDisclaimer } from '~/data/prices'

const featuredPrices = computed(() => prices.slice(0, 4))
const otherPrices = computed(() => prices.slice(4))
</script>

<template>
  <section class="section-padding">
    <div class="container-narrow">
      <UiReveal>
        <h2 class="section-title">Орієнтовні ціни</h2>
        <p class="section-subtitle">
          Вартість залежить від моделі авто та складності робіт. Точну ціну погоджуємо перед ремонтом.
        </p>
      </UiReveal>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UiReveal
          v-for="(item, index) in featuredPrices"
          :key="item.service"
          :delay="index * 50"
        >
          <div class="card-static h-full text-center">
            <p class="text-sm text-text-muted">{{ item.service }}</p>
            <p class="mt-3 text-2xl font-heading text-accent">{{ item.price }}</p>
          </div>
        </UiReveal>
      </div>

      <UiReveal :delay="100">
        <div class="mt-8 overflow-x-auto rounded-xl border border-border">
          <table class="w-full min-w-[320px] text-left text-sm">
            <thead class="bg-surface">
              <tr>
                <th class="px-6 py-4 font-heading uppercase tracking-wide text-text-soft">Інші послуги</th>
                <th class="px-6 py-4 font-heading uppercase tracking-wide text-text-soft">Ціна</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in otherPrices"
                :key="item.service"
                class="border-t border-border transition-colors hover:bg-surface/50"
                :class="index % 2 === 0 ? 'bg-bg' : 'bg-bg-soft'"
              >
                <td class="px-6 py-4 text-text-soft">{{ item.service }}</td>
                <td class="px-6 py-4 font-medium text-accent">{{ item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </UiReveal>

      <UiReveal :delay="120">
        <p class="mt-6 text-sm text-text-muted">
          {{ priceDisclaimer }}
        </p>
      </UiReveal>
    </div>
  </section>
</template>
