<script setup lang="ts">
import { prices, priceDisclaimer } from '~/data/prices'
</script>

<template>
  <section class="section-padding bg-bg-soft">
    <div class="container-narrow">
      <UiReveal>
        <h2 class="section-title">Орієнтовні ціни</h2>
        <p class="section-subtitle">
          Вартість залежить від моделі авто та складності робіт. Точну ціну погоджуємо перед ремонтом.
        </p>
      </UiReveal>

      <UiReveal :delay="80">
        <div class="mt-10 overflow-hidden rounded-xl border border-border">
          <table class="w-full text-left text-sm">
            <thead class="bg-surface">
              <tr>
                <th class="px-6 py-4 font-heading uppercase tracking-wide text-text-soft">Послуга</th>
                <th class="px-6 py-4 font-heading uppercase tracking-wide text-text-soft">Ціна</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in prices"
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
